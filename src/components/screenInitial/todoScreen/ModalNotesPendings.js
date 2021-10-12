import React from 'react';
import { useDispatch } from 'react-redux';
import { updateNotesAsync } from '../../../actions/todo';
import close_button from '../../../close_black_24dp.svg'; 
import doneImg from '../../../done_black_24dp.svg';
export const ModalNotesPendings = ({handleChangeStatus, title, description, done, isEliminated, id}) => {

    const dispatch = useDispatch();

    const handleDone = () => {
        const todoToUpdate = {
            id,
            title, 
            description, 
            done: !done,
            isEliminated,
        }
        dispatch(updateNotesAsync(id, todoToUpdate));
    }
    return (
        <div 
        className="background"
        >
            <section className="pendings-modal">
                <article className="info">
                <img 
                src={close_button} 
                alt="close-button" 
                className="close-button" 
                onClick={ handleChangeStatus }
                />
                <div className="todo">
                    {title}
                </div>
                <div className="todo">
                    {description}
                </div>
                <div className="actions-pendings">
                <button
                onClick={handleDone}
                >
                    <img src={doneImg} alt="done" />
                    Done
                </button>
                </div>
                </article>
            </section>
        </div>
    )
}
