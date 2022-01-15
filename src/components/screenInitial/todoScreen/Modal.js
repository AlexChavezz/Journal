import React, { useRef } from 'react'
import {useSelector } from 'react-redux';
import { onCloseModal } from '../../../helpers/onCloseModal';
import { Form } from './Form';

export const Modal = ({ setShowForm }) => {

    const { mode } = useSelector(state => state.modal);
    const elementToAnimateRef = useRef();

    const animation = () => {
        elementToAnimateRef.current.animate([
            {transform: 'translateY(0px)'},
            { opacity: 1},
            {transform: 'translateY(-200px)'},
            {opacity: 0},
        ], {
            duration: 200
        })
    }
    const hiddeModal = () => {
        animation();
        window.setTimeout(() => {
            setShowForm(false);
        }, 150);
    }
    return (
        <div 
        className="modal"
        onClick={ e =>onCloseModal(e.target, "modal", setShowForm, {current: animation, time: 150})}
        >
            <div className='modal-content' 
            ref={elementToAnimateRef}
            >
                {
                    mode === 'add' ?
                        (<h3>ADD TASK</h3>)
                        :
                        (<h3>UPDATE TASK</h3>)
                }
                <Form hiddeModal={hiddeModal}/>                
            </div>
        </div>
    )
}
