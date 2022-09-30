import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Cross from '../assets/cross.svg'

export default function List() {

    const [argo, setArgo] = useState("")
    const [validation, setValidation] = useState("")
    const [argonauts, setArgonauts] = useState([])

    // Récupérer les argonautes
    useEffect(() => {
        axios.get('http://localhost/test/back/GetArgonauts.php')
            .then(response => {
                console.log(response.data)
                setArgonauts(response.data)
            })
            .catch(error => {
                return error.message
            })
    }, [])

    //Supprimer un(e) argonaute
    const handleRemove = ($id) => {
        axios.post('http://localhost/test/back/DeleteArgonaut.php', { id: $id })
            .catch(error => {
                console.log(error)
            })
        window.location.reload();
    }

    // Ajouter un(e) argonaute
    const handleForm = e => {
        if (argo !== "") {
            axios.post('http://localhost/test/back/SetArgonaut.php', { name: argo })
                .catch(error => {
                    console.log(error)
                })
        } else {
            setValidation("Entrez un nom !!!")
        }
    }

    return (
        <div>
            {/** TITRE */}
            <h1 className='text-center text-light fw-bold mx-1 py-2'>Jason & Les Argonautes</h1>

            {/** FORMULAIRE */}
            <form className='text-center mx-auto my-2 p-3' onSubmit={e => handleForm(e)}>
                <label htmlFor="basic-url" className="form-label text-light fw-bold">Ajouter un(e) argonaute</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Entrez un nom...'
                        value={argo}
                        onChange={e => setArgo(e.target.value)}
                    />
                    <button className='btn btn-dark text-light' type='submit'>Ajouter</button>
                </div>
                <p className='text-danger'>{validation}</p>
            </form>

            {/** LISTE */}
            <h2 className='text-center text-light'>- Membres de l'équipage -</h2>
            <p className='text-center text-light'>Il reste {50 - argonauts.length} membres à ajouter</p>

            
            <div className='row d-flex list'>
                {
                    argonauts && argonauts.map(argonaut => {
                        return (
                            <>
                                <div className='col-12 col-md-4 g-5 mt-1 text-center rounded' key={uuidv4()}>
                                    <div className='row' >
                                        <div className=' d-flex justify-content-between align-items-center fw-bold bg-dark text-light p-1 rounded-3'  >
                                            <div className='col-8'>
                                                {argonaut.name.toUpperCase()}
                                            </div>
                                            <div className='col-4' >
                                                <img src={Cross} className='btn' onClick={() => handleRemove(argonaut.id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

            </div>
        </div>
    )
}
