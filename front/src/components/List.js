import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Cross from '../assets/remove.png'
import Goat from '../assets/goat.png'

export default function List(props) {

    // DELETE ARGONAUT
    const handleRemove = async ($id) => {
        await axios.post(process.env.REACT_APP_AXIOS_URL + 'DeleteArgonaut.php', { id: $id })
            .catch(error => {
                console.error(error)
            })
        window.location.reload();
    }

    return (
        <div>

            {/**    LIST HIDDEN    */}
            <div className='d-flex justify-content-center'>
                {
                    props.argonauts && props.argonautsLength < 50 ?
                        <div className='d-flex flex-column justify-content-center align-items-center '>
                            <div className={!props.toggle ? 'text-light fw-bold bg-primary p-2 rounded-3 mt-2 display-info' : 'd-none'}>Il reste {50 - props.argonautsLength} membres à ajouter</div>
                            <img src={Goat} style={{ width: "300px" }} className={!props.toggle ? "my-5 goat" : "d-none"} />
                            <p className={!props.toggle ? 'fw-bold goat' : 'd-none'}>- A la conquête de la toison d'or -</p>
                        </div>
                        :
                        <div className='d-flex flex-column justify-content-center align-items-center '>
                            <div className={!props.toggle ? 'text-light fw-bold bg-success p-2 rounded-3 mt-2 display-info' : 'd-none'}>Félicitations ! Vous avez réunis {props.argonautsLength} argonautes pour former l'équipage !</div>
                            <img src={Goat} style={{ width: "300px" }} className={!props.toggle ? "my-5 goat" : "d-none"} />
                            <p className={!props.toggle ? 'fw-bold goat' : 'd-none'}>- A la conquête de la toison d'or -</p>
                        </div>
                }
            </div>

            {/**    LIST    */}
            <div className={props.toggle ? 'd-flex row list' : 'd-none row list'}>
                {/**    DATABASE LIST   */}
                {
                    props.argonauts && props.argonauts.map(argonaut => {
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

                {/**    EXTRA-ARGONAUT  */}
                {
                    props.argonauts && props.argonautsLength > 50 &&
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
