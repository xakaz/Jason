import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Cross from '../assets/remove.png'
import Up from '../assets/arrow-bar-up.svg'
import Down from '../assets/arrow-bar-down.svg'
import Boat from '../assets/bateau.png'

export default function List() {

    // Variables & fonctions de mise à jour du state
    const [argo, setArgo] = useState("")
    const [validation, setValidation] = useState("")
    const [argonauts, setArgonauts] = useState([])
    const [toggle, setToggle] = useState(true)
    const [congrat, setCongrat] = useState("")


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
    const handleRemove = async ($id) => {
        await axios.post('http://localhost/test/back/DeleteArgonaut.php', { id: $id })
            .catch(error => {
                console.log(error)
            })
        window.location.reload();
    }

    // Ajouter un(e) argonaute
    const handleForm = async (e) => {
        e.preventDefault()
        if (argo !== "") {
            await axios.post('http://localhost/test/back/SetArgonaut.php', { name: argo })
                .catch(error => {
                    console.log(error)
                })
            window.location.reload()
        } else {
            setValidation("Entrez un nom !!!")
        }
    }


    return (
        <>
            {/** TITRE */}
            <div className='title'>
                <h1 className='text-center fw-bold mt-3 py-2'>Jason & Les Argonautes</h1>
                <h1 className='text-center mt-3 py-2'>Jason & Les Argonautes</h1>
                <h1 className='text-center text-light mt-3 py-2'>Jason & Les Argonautes</h1>
            </div>

            <div className='row'>
                {/** BATEAU GAUCHE */}
                <div className='d-none d-md-flex col-3 d-flex align-items-center bateau1'>
                    <img src={Boat} style={{ width: '90px' }} />
                    <img src={Boat} style={{ width: '90px' }} />
                </div>
                {/** FORMULAIRE */}
                <form className=' col-12 col-md-6 text-center mx-auto my-2 p-3' onSubmit={e => handleForm(e)}>
                    <label htmlFor="basic-url" className="form-label text-light fw-bold">Ajouter un(e) argonaute</label>
                    <div className="input-group mb-3 shadow">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Entrez un nom...'
                            value={argo}
                            onChange={e => setArgo(e.target.value)}
                        />
                        <button className='btn btn-secondary text-light fw-bold' type='submit'>Engager</button>
                    </div>

                    <p className='text-warning p-1 fw-bold'>{validation}</p>
                </form>
                {/** BATEAU DROITE */}
                <div className='d-none d-md-flex col-3 d-flex align-items-center justify-content-start bateau2'>
                    <img src={Boat} style={{ width: '90px' }} />
                    <img src={Boat} style={{ width: '90px' }} />
                </div>
            </div>

            {/** TITRE LISTE */}
            <h2 className='text-center text-light fw-bold'>
                Membres de l'équipage
            </h2>

            <div className='d-flex justify-content-center mb-2 reste-btn'>
                {
                    argonauts && argonauts.length < 50 ?
                        <p className=' text-light fw-bold bg-primary p-3 rounded-3'>Il reste {50 - argonauts.length} membres à ajouter</p>
                        :
                        <p className=' text-light fw-bold bg-success p-3 rounded-3'>Félicitations ! Vous avez réunis 50 argonautes pour former l'équipage !</p>

                }
            </div>

            {/** BOUTON DE REPLIS/DEPLIS */}
            <div className='text-center'>
                <img className="bg-light rounded-circle p-2 btn shadow-sm" src={toggle ? Up : Down} onClick={() => setToggle(!toggle)} />
            </div>

            {/** LISTE */}
            <div className={toggle ? 'd-flex row list' : 'd-none row list'}>

                {
                    argonauts && argonauts.map(argonaut => {
                        return (
                            <>
                                <div className='col-12 col-md-4 g-5 mt-1 text-center rounded' key={uuidv4()}>
                                    <div className='row' >
                                        <div className=' d-flex justify-content-between align-items-center bg-dark fw-bold text-light p-1 rounded-3'>
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
        </>
    )
}
