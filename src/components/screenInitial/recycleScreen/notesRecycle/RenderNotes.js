import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteNoteAsync, resetNoteAsync } from '../../../../actions/notes';

export const RenderNotes = ( {note , id} ) => {
    
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteNoteAsync(id));
    }
    const handleReset = () => {
        dispatch(resetNoteAsync(id));
    }

    return (
        <div className="target target_notes">
            <p>{note}</p>
            <div className="buttons">
                <button
                    className="reset"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button
                    className="delete_perman"
                    onClick={handleDelete}
                >
                    Permanently Delete
                </button>

            </div>
        </div>
    )
}
