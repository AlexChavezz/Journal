import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showModalAdd } from '../../../actions/modal';
import { removeActiveNote, startNewNote, updateNotesAsync } from '../../../actions/todo';
import { Toast } from '../../../alerts/alert';
import { useForm } from '../../../hooks/useForm';

export const Form = ( { setShowForm } ) => {
    
    const [ { title, description }, handleInputChange ] = useForm({
        title: '',
        description: '',
        done: null,
    });

    const dispatch = useDispatch();
    const { mode } = useSelector(state => state.modal);

    const { id } = useSelector(state => state.active);


    const handleSubmit = (e) => {
        e.preventDefault();
        const note = {
            title,
            description,
            done: false,
        }
        if( isValidate() ){
            if (mode === 'add') {
                dispatch(startNewNote(note));
            } else if (mode === 'edit') {
                dispatch(updateNotesAsync(id, note));
                dispatch(showModalAdd());
            }
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Title and description required',
            });
        }
        setShowForm(false);
        dispatch(removeActiveNote());
    }

    const isValidate = () => {

        if ( title.trim() === ''){

            return false;

        }else if ( description.trim() === ''){

            return false;
        }
        return true;
    }
    
    return (
        <form
            className="form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder={mode === 'add' ? 'Type a title' : 'Type a new title'}
                autoComplete="off"
                name="title"
                value={title}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder={mode === 'add' ? 'Type a description' : 'Type a new description'}
                autoComplete="off"
                name="description"
                value={description}
                onChange={handleInputChange}
            />
            <input
                type="submit"
                className="submit-form"
                value={mode === 'add' ? 'ADD' : 'UPDATE'}
            />
            <input
                type="button"
                className="cancel-form"
                value="CANCEL"
                onClick={() => {
                    setShowForm(false)
                    dispatch(removeActiveNote());
                }}
            />
        </form>)
}
