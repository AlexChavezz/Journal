import React from 'react'
import {useSelector } from 'react-redux';
import { Form } from './Form';

export const Modal = ({ setShowForm }) => {

    const { mode } = useSelector(state => state.modal);

    return (
        <div className="modal ">
            <div className='modal-content animate__animated animate__fadeInDown' >
                {
                    mode === 'add' ?
                        (<h3>ADD TASK</h3>)
                        :
                        (<h3>UPDATE TASK</h3>)
                }
                <Form setShowForm={setShowForm}/>                
            </div>
        </div>
    )
}
