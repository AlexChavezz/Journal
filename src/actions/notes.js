import { addDoc, collection, deleteDoc, doc } from "@firebase/firestore";
import { Toast } from "../alerts/alert";
import { db } from "../firebase/firebase_config";
import { getNotes } from "../helpers/getNotes";
import { types } from "../types/types";

export const loadNotesAsync = () => {
    return async (dispatch ,getstate) => {
        const { uid } = getstate().auth;
        const notes = await getNotes(uid);
        dispatch(loadNotes(notes));
    }
}
export const addNoteAsync = ( note = '' ) => {
    console.log(note)
    return ( dispatch, getstate ) => {
        const { uid } = getstate().auth;
        addDoc(collection(db, `${ uid }/journal/notes`), note).then( doc => {
            dispatch(addNote( note, doc.id ));
            Toast.fire({
                icon: 'success',
                title: 'Note Saved'
            });
        });
    }
}

export const removeNoteAsync = ( id ) => { 
    return ( dispatch, getstate ) => {
        const { uid } = getstate().auth;
        deleteDoc(doc(db, `/${ uid }/journal/notes/${ id }`))
        .then( () => {
            Toast.fire({
                icon: 'success',
                title: 'Note Deleted'
            });
        });
        dispatch(removeNote( id ));
    }
}

export const addNote = ( note, id ) => ({
    type: types.addNote,
    payload: {
        id,
        ...note,
    }
});

export const loadNotes =  ( notes ) => ({
    type: types.loadNote,
    payload: notes,
});

export const removeNote = ( id ) => ({
    type: types.deleteNote,
    payload: id,
});