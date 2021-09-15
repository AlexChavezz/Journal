import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Rendertodo } from './Rendertodo';

export const RecycleScreenTodos = () => {

    const history = useHistory();
    const handleGoBack = () => {
        history.goBack();
    }

    const {state} = useSelector(state => state.todos);

    return (
        <div className="journal_container">
            <div className="return_arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" className="bi bi-arrow-left-square" viewBox="0 0 16 16"
                onClick={handleGoBack}
                >
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
            </div>
            <div className="container_todos">
            {
                state.map(todo => todo.isEliminated && <Rendertodo key={todo.id} {...todo}/>)
            }
            </div>
        </div>
    )
}
