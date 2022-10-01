import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Cross from '../assets/remove.png'
import Up from '../assets/arrow-bar-up.svg'
import Down from '../assets/arrow-bar-down.svg'
import Boat from '../assets/bateau.png'
import Goat from '../assets/goat.png'

export default function List() {

    // Variables & fonctions de mise à jour du state
    const [argo, setArgo] = useState("")
    const [validation, setValidation] = useState("")
    const [argonauts, setArgonauts] = useState([])
    const [toggle, setToggle] = useState(true)
    const [alreadyExists, setAlreadyExists] = useState(false)

    // Récupérer les argonautes
    useEffect(() => {
        axios.get(process.env.REACT_APP_AXIOS_URL + 'GetArgonauts.php')
            .then(response => {
                setArgonauts(response.data)
            })
            .catch(error => {
                return error.message
            })
    }, [])

    //Supprimer un(e) argonaute
    const handleRemove = async ($id) => {
        await axios.post(process.env.REACT_APP_AXIOS_URL + 'DeleteArgonaut.php', { id: $id })
            .catch(error => {
                console.error(error)
            })
        window.location.reload();
    }

    // Vérifie l'existence d'un argonaute
    const handleSubmit = () => {
        argonauts.forEach(argonaut => {
            if (argonaut.name.toUpperCase() === argo.toLocaleUpperCase()) {
                setAlreadyExists(true)
            }
        });
    }

    // Ajouter un(e) argonaute
    const handleForm = (e) => {
        e.preventDefault()

        if (argo !== "") {
            if (!alreadyExists) {
                axios.post(process.env.REACT_APP_AXIOS_URL + 'SetArgonaut.php', { name: argo })
                    .catch(error => {
                        console.error(error)
                    })
                window.location.reload()
            } else {
                setValidation("Ce membre fait déjà parti de l'équipage !")
                setAlreadyExists(false)
            }
        } else {
            setValidation("Entrez un nom !!!")
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                {/** BATEAU GAUCHE */}
                <div className='d-none d-md-flex col-3 align-items-center bateau1'>
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
                            onChange={e => setArgo(e.target.value.toUpperCase())}
                        />
                        <button className='text-light fw-bold' type='submit' onClick={handleSubmit}>Engager</button>
                    </div>

                    <div className='validation'>
                        <p className='text-warning p-1 fw-bold'>{validation}</p>
                    </div>
                </form>
                {/** BATEAU DROITE */}
                <div className='d-none d-md-flex col-3 align-items-center justify-content-start bateau2'>
                    <img src={Boat} style={{ width: '90px' }} />
                    <img src={Boat} style={{ width: '90px' }} />
                </div>
            </div>

            {/** BOUTON DE REPLIS/DEPLIS */}
            <div className='text-center mb-3 d-flex justify-content-center'>
                <h2 className='text-center text-light fw-bold'>
                    Membres de l'équipage
                </h2>
                <div className='mx-3'>
                    <img className="bg-light rounded-circle p-2 btn shadow-sm" src={toggle ? Up : Down} onClick={() => setToggle(!toggle)} />
                </div>
            </div>

            {/** LISTE */}
            <div className='d-flex justify-content-center'>
                {
                    argonauts && argonauts.length < 50 ?
                        <div className='d-flex flex-column justify-content-center align-items-center '>
                            <div className={!toggle ? 'text-light fw-bold bg-primary p-2 rounded-3 mt-2 display-info' : 'd-none'}>Il reste {50 - argonauts.length} membres à ajouter</div>
                            <img src={Goat} style={{ width: "300px" }} className={!toggle ? "my-5 goat" : "d-none"} />
                            <p className={!toggle ? 'fw-bold goat' : 'd-none'}>- A la conquête de la toison d'or -</p>
                        </div>
                        :
                        <div className='d-flex flex-column justify-content-center align-items-center '>
                            <div className={!toggle ? 'text-light fw-bold bg-success p-2 rounded-3 mt-2 display-info' : 'd-none'}>Félicitations ! Vous avez réunis {argonauts.length} argonautes pour former l'équipage !</div>
                            <img src={Goat} style={{ width: "300px" }} className={!toggle ? "my-5 goat" : "d-none"} />
                            <p className={!toggle ? 'fw-bold goat' : 'd-none'}>- A la conquête de la toison d'or -</p>
                        </div>
                }
            </div>
            <div className={toggle ? 'd-flex row list' : 'd-none row list'}>
                {
                    argonauts && argonauts.map(argonaut => {
                        return (
                            <div className='col-12 col-md-4 g-5 mt-1 text-center rounded' key={uuidv4()}>
                                <div className='row' >
                                    <div className=' d-flex justify-content-between align-items-center element fw-bold text-light p-1 rounded-3'>
                                        <div className='col-8'>
                                            {argonaut.name.toUpperCase()}
                                        </div>
                                        <div className='col-4' >
                                            <img src={Cross} className='btn' onClick={() => handleRemove(argonaut.id)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    argonauts && argonauts.length > 50 &&
                    <div className='col-12 col-md-4 g-5 mt-1 text-center rounded'>
                        <div className='row' >
                            <div className=' d-flex justify-content-between align-items-center bg-success fw-bold text-light p-1 rounded-3' style={{ height: "45px" }}>
                                <div className='col-12' >
                                    LOIC HERNANDEZ : CHANCEUX
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
