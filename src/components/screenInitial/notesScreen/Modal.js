import React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addNoteAsync, removeActiveNote, updateNoteAsync } from '../../../actions/notes';
import { Toast } from '../../../alerts/alert';
import { onCloseModal } from '../../../helpers/onCloseModal';
import { useForm } from '../../../hooks/useForm';

export const Modal = ({ setstatus }) => {

    const { notes } = useSelector(state => state.active)

    const [values, handleInputChange, setValues] = useForm({
        date: null,
        note: notes.note,
        isEliminated: null,
    });

    const { note } = values;

    const dispatch = useDispatch();

    const handleAddNote = () => {
        hiddeModal();
        if (notes.note) {
            setValues({
                ...values,
                note: notes.note,
            });
            const noteToUpdate = {
                date: new Date().getTime(),
                note: note,
                isEliminated: false
            }
            if (isFormValidate()) {
                dispatch(updateNoteAsync(notes.id, noteToUpdate));
                hiddeModal();
            }
        } else {
            const newNote = {
                date: new Date().getTime(),
                note: note,
                isEliminated: false,
            }

            if (isFormValidate()) {
                dispatch(addNoteAsync(newNote));
                hiddeModal();
            }
        }
        dispatch(removeActiveNote());
    }

    const isFormValidate = () => {

        if (note.trim().length === 0) {
            Toast.fire({
                icon: 'error',
                title: 'Note is required'
            })
            return false;
        }

        return true;
    }
    // -> animation function 
    const elementToAnimate = useRef();
    const animation = () => {
        elementToAnimate.current.animate([
            { opacity: 1 },
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-50px)' },
            { opacity: 0}
        ], {
            duration: 200
        })
    }
    const hiddeModal = () => {
        animation();
        setTimeout(() => {
            setstatus(false);
        }, 150);
    }
    return (
        <div
            className="modal-notes"
            onClick={ e => onCloseModal(e.target, "modal-notes", setstatus, { current: animation, time: 150} )}
        >
            <div className="modal-content-notes"
            ref={elementToAnimate}
            >
                <textarea
                    className="text-area"
                    name="note"
                    value={note}
                    onChange={handleInputChange}
                ></textarea>
                <div className="buttons-notes">
                    <button
                        className="btn-save"
                        onClick={handleAddNote}
                    >
                        SAVE
                    </button>
                    <button
                        className="btn-cancel"
                        onClick={() => {
                            hiddeModal();
                            dispatch(removeActiveNote());
                        }}
                    >CANCEL</button>
                </div>
            </div>
        </div>
    )
}
