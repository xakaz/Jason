import React, {useState}from 'react'
import Boat from '../assets/bateau.png'
import axios from 'axios'


export default function Form(props) {

    // Variables & states
    const [argo, setArgo] = useState("")
    const [validation, setValidation] = useState("")
    const [alreadyExists, setAlreadyExists] = useState(false)

    // Vérifie l'existence d'un argonaute
    const handleSubmit = () => {
        props.argonauts.forEach(argonaut => {
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
    )
}
