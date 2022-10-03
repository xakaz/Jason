import React from 'react'
import Up from '../assets/arrow-bar-up.svg'
import Down from '../assets/arrow-bar-down.svg'

export default function ToggleButton(props) {

    return (
        <div className='text-center mb-3 d-flex justify-content-center'>
            {/**    TITLE   */}
            <h2 className='text-center text-light fw-bold'>
                Membres de l'équipage
            </h2>
            {/**    BUTTON  */}
            <div className='mx-3'>
                <img className="bg-light rounded-circle p-2 btn shadow-sm" src={props.toggle ? Up : Down} onClick={props.set} />
            </div>
        </div>
    )
}
