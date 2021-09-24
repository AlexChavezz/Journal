import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showModalAdd } from '../../../actions/modal';
import { removeActiveTodo, startNewNote, updateNotesAsync } from '../../../actions/todo';
import { Toast } from '../../../alerts/alert';
import { useForm } from '../../../hooks/useForm';


const initialState = {
    title: '',
    description: '',
    done: null,
}

export const Form = ( { setShowForm } ) => {
    
 

    const [ formValues, handleInputChange, setValues ] = useForm(initialState);
    const { title, description} = formValues;

    const dispatch = useDispatch();
    const { mode } = useSelector(state => state.modal);
    const { titleActive, descriptionActive, idActive } = useSelector(state => state.active);
    

    useEffect(() => {
        if( titleActive && descriptionActive ) {
            setValues({
                title: titleActive,
                description: descriptionActive,
            });
        }else{
            setValues(initialState);
        }
    }, [setValues, titleActive, descriptionActive]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const note = {
            title,
            description,
            done: false,
            isEliminated: false,
        }
        if( isValidate() ){
            if (mode === 'add') {
                dispatch(startNewNote(note));
            } else if (mode === 'edit') {
    
                dispatch(updateNotesAsync({
                    titleActive, 
                    descriptionActive,
                    idActive,
                }, note));
                dispatch(showModalAdd());
            }
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Title and description required',
            });
        }
        setShowForm(false);
        dispatch(removeActiveTodo());
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
                    dispatch(removeActiveTodo());
                }}
            />
        </form>)
}
