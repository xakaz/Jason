import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Cross from '../assets/remove.png'

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
            <h1 className='text-center my-5 py-2'>Jason & Les Argonautes</h1>

            {/** FORMULAIRE */}
            <form className='text-center w-50 mx-auto my-5' onSubmit={e => handleForm(e)}>
                <label htmlFor="basic-url" className="form-label">Ajouter un(e) argonaute</label>
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
            <h2 className='text-center'>- Membres de l'équipage -</h2>
            <p className='text-center'>Il reste {50 - argonauts.length} membres à ajouter</p>
            <hr />
            <div className='row d-flex'>
                {
                    argonauts && argonauts.map(argonaut => {
                        return (
                            <>
                                <div className='col-4 text-center py-2 rounded my-2' key={uuidv4()}>
                                    <div className='row' >
                                        <div className='col-6 d-flex justify-content-end align-items-center fw-bold' >
                                            {argonaut.name.toUpperCase()}
                                        </div>
                                        <div className='col-6 d-flex justify-content-start align-items-center' >
                                            <span
                                                className='btn'
                                                onClick={() => handleRemove(argonaut.id)}>
                                                <img src={Cross} />
                                            </span>
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
