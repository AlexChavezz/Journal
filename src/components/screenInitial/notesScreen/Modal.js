import React from 'react';
import { useDispatch } from 'react-redux';
import { addNoteAsync } from '../../../actions/notes';
import { Toast } from '../../../alerts/alert';
import { useForm } from '../../../hooks/useForm';

export const Modal = ({ handleChangeState }) => {

    const [ values , handleInputChange ] = useForm({
        date: null,
        note:'',
    });
    const { note } = values;

    const dispatch = useDispatch();

    const handleAddNote = () => {
        const newNote = {
            date: new Date().getTime(),
            note: note,
        }
        
        if( isFormValidate() ){
            dispatch(addNoteAsync( newNote ));
            handleChangeState();  
        }
    }

    const isFormValidate = () => {
        
        if( note.trim().length  === 0){
            Toast.fire({
                icon: 'error',
                title: 'Note is required'
            })
            return false;
        }
        
        return true;
    }

    return (
        <div className="modal-notes animate__animated animate__fadeInTopLeft">
            <div className="modal-content-notes">
                <textarea 
                className="text-area"
                name="note" 
                value={ note }
                onChange={ handleInputChange }            
                ></textarea>
                <div className="buttons-notes">
                    <button
                        className="btn-save"
                        onClick={ handleAddNote }
                    >SAVE</button>
                    <button
                        className="btn-cancel"
                        onClick={() => handleChangeState()}
                    >CANCEL</button>
                </div>
            </div>
        </div>
    )
}
