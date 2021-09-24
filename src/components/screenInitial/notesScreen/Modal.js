import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addNoteAsync, removeActiveNote, updateNoteAsync } from '../../../actions/notes';
import { Toast } from '../../../alerts/alert';
import { useForm } from '../../../hooks/useForm';

export const Modal = ({ handleChangeState }) => {

    const {notes} = useSelector(state => state.active)

    const [ values , handleInputChange, setValues ] = useForm({
        date: null,
        note:notes.note,
        isEliminated: null,    
    });


    const { note } = values;
    const dispatch = useDispatch();

    const handleAddNote = () => {

        if (notes.note){
            setValues({
                ...values,
                note: notes.note,
            });
            const noteToUpdate = {
                date: new Date().getTime(),
                note: note,
                isEliminated: false
            }
            dispatch(updateNoteAsync( notes.id, noteToUpdate));
            handleChangeState(); 
        
        }else{
        const newNote = {
            date: new Date().getTime(),
            note: note,
            isEliminated: false,
        }
        
        if( isFormValidate() ){
            dispatch(addNoteAsync( newNote ));
            handleChangeState();  
        }
    }
    dispatch(removeActiveNote());
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
                value={note}
                onChange={ handleInputChange }            
                ></textarea>
                <div className="buttons-notes">
                    <button
                        className="btn-save"
                        onClick={ handleAddNote }
                    >
                        SAVE
                    </button>
                    <button
                        className="btn-cancel"
                        onClick={() => {
                            handleChangeState()
                            dispatch(removeActiveNote());
                        }}
                    >CANCEL</button>
                </div>
            </div>
        </div>
    )
}
