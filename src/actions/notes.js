import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import { Toast } from "../alerts/alert";
import { db } from "../firebase/firebase_config";
import { getNotes } from "../helpers/getNotes";
import { types } from "../types/types";

const getNoteToChange = async (uid, id, boolean) => {
    const docRef = doc(db, `${uid}/journal/notes/${id}`);        
    const docs  =  await getDoc(docRef);
    
    return {
        ...docs.data(),
        isEliminated:boolean,
    }
}
export const loadNotesAsync = () => {
    return async (dispatch ,getstate) => {
        const { uid } = getstate().auth;
        const notes = await getNotes(uid);
        dispatch(loadNotes(notes));
    }
}
export const addNoteAsync = ( note = '' ) => {
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
    return async (dispatch, getstate) => {
        const { uid } = getstate().auth;
      
        const note = await getNoteToChange(uid, id, true);

        updateDoc(doc(db, `/${uid}/journal/notes/${id}`), note)
        .then( () => {
            Toast.fire({
                icon: 'success',
                title: 'Eliminated',
                text:'Note added to paper bin',
            });
        }).catch ( () => {
            Toast.fire({
                icon: 'error',
                title: 'Error',
                text:'Error try again',
            });                
        });
        dispatch(removeNote(id));
    }
}
export const resetNoteAsync = (id) => {
    return async(dispatch, getstate) => {
        const { uid } = getstate().auth;
        const note = await getNoteToChange(uid, id, false);

        updateDoc(doc(db, `/${uid}/journal/notes/${id}`), note)
        .then( () => {
            Toast.fire({
                icon: 'success',
                title: 'Note reset',
            });
        }).catch ( () => {
            Toast.fire({
                icon: 'error',
                title: 'Error',
                text:'Error try again',
            });                
        });
        dispatch(resetNote(id));
    }
}
export const deleteNoteAsync = ( id ) => {
    return ( dispatch, getstate ) => {
        const { uid } = getstate().auth;
        deleteDoc(doc(db, `/${ uid }/journal/notes/${id}`))
        .then( () => {
            Toast.fire({
                icon: 'success',
                title: 'Note Deleted'
            });
        });
        dispatch(deleteNote(id));
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
    type: types.removeNote,
    payload: id,
});
export const deleteNote = ( id ) => ({
    type: types.deleteNote,
    payload:id,
});
export const resetNote = ( id ) => ({
    type: types.resetNote,
    payload: id,
})