import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase_config"
import { loadListToDo } from "../helpers/loadListToDo";
import { types } from "../types/types";
import Swal from 'sweetalert2'
import { Toast } from "../alerts/alert";


export const loadTodosAsync = (uid) => {
    return async (dispatch) => {
        const notes = await loadListToDo(uid);
        dispatch(notesLoad(notes));
    }
}
export const startNewNote = (note) => {
    return (dispatch, setstate) => {
        const { uid } = setstate().auth;
        addDoc(collection(db, `/${uid}/journal/toDoList`), note)
            .then( doc => {
                Toast.fire({
                    icon: 'success',
                    title: 'Saved'
                });
                dispatch(  addNewNote(doc.id, note) ); 
            }).catch( () => {
                Swal.fire('Error', 'Error try again', 'error')
            });
    }
}

export const removeNoteAsync = (id) => {
    return (dispatch, setstate) => {
        const { uid } = setstate().auth;
        deleteDoc(doc(db, `/${uid}/journal/toDoList/${id}`))
            .then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Eliminated'
                })
            }).catch(() => {
                Swal.fire('Error', 'Error try again', 'error')
            });
        dispatch(removeNote(id));
    }
}

export const updateNotesAsync = (id, note) => {
    return (dispatch, setstate) => {
        const { uid } = setstate().auth;
        updateDoc(doc(db, `/${uid}/journal/toDoList/${id}`), note)
            .then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Updated'
                })
            }).catch(() => {
                Swal.fire('Error', 'Error try again', 'error')
            });
        dispatch(updateNote(id, note));
    }
}

export const addNewNote = (id, newData) => ({
    type: types.addNewNote,
    payload: {
        id,
        ...newData,
    }
});

export const notesLoad = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const removeNote = (id) => ({
    type: types.removeNote,
    payload: id,
});

export const updateNote = (id, note) => ({
    type: types.updateNote,
    payload: {
        id,
        ...note
    }
});

export const activeNote = (id) => ({
    type: types.noteActive,
    payload: id
});
export const removeActiveNote = () => ({
    type: types.removeNoteActive,
});