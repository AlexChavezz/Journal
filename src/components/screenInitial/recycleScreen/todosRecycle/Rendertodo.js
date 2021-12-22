import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, resetTodoAsync } from '../../../../actions/todo';

export const Rendertodo = React.memo(({ title, description, id, isEliminated, note }) => {

    const dispatch = useDispatch();

    const handeldelete = () => {
        dispatch(deleteTodoAsync(id));
    }
    const handleReset = () => {
        dispatch(resetTodoAsync(id));
    }
    return (
        <div className="todos_eliminateds">
            {
                title && description ?
                    <>
                        <span>
                            {title}
                        </span>
                        <p>
                            {description}
                        </p>
                    </>
                    :
                    <>
                        <p>{note}</p>
                    </>
            }
            <p
                className={isEliminated ? "eliminated" : "noEliminated"}
            >
                {isEliminated ? "Eliminated" : "Saved"}
            </p>
            {
                isEliminated && title && description &&
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
            }

        </div>
    )
})
