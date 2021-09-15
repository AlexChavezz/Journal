import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, resetTodoAsync } from '../../../../actions/todo';

export const Rendertodo = ({ title,description, id }) => {

    const dispatch = useDispatch();

    const handeldelete = () => {
        dispatch(deleteTodoAsync(id));
    }
    const handleReset = () => {
        dispatch(resetTodoAsync(id));
    }

    return (
        <div className="todos_eliminateds">
            <span>
                {title}
            </span>
            <p>
                {description}
            </p>
            <div className="buttons">
                <button 
                className="reset"
                onClick={handleReset}
                >Reset</button>
                <button 
                className="delete_perman"
                onClick={handeldelete}
                >Permanently Delete</button>
            </div>
        </div>
    )
}
