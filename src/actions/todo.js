import { collection, addDoc,doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore"
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

export const removeTodoAsync = ( id ) => {
    return async (dispatch, setstate) => {
        const { uid } = setstate().auth;

        const docRef = doc(db, `/${uid}/journal/toDoList/${id}`);
        const docs = await getDoc(docRef);

        const todo = {
         ...docs.data(),
         isEliminated: true,   
        }
        updateDoc(doc(db, `/${uid}/journal/toDoList/${id}`), todo)
        .then( () => {
            Toast.fire({
                icon: 'success',
                title: 'Eliminated',
                text:'To do add to paper bin',
            });
        });
        dispatch(removeTodo(id));
    }
}

export const deleteTodoAsync = (id) => {
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
        dispatch(deleteTodo(id));
    }
}
export const resetTodoAsync = (id) => {
    return async (dispatch, setstate) => {
        const { uid } = setstate().auth;

        const docRef = doc(db, `/${uid}/journal/toDoList/${id}`);
        const docs = await getDoc(docRef);

        const todo = {
         ...docs.data(),
         isEliminated: false,   
        }
        updateDoc(doc(db, `/${uid}/journal/toDoList/${id}`), todo)
        .then( () => {
            Toast.fire({
                icon: 'success',
                title: 'Todo has reseted',
            });
            
        }).catch(() => {
            Toast.fire({
                icon: 'error',
                title: 'Error try again',
            });
        });
        dispatch(resetTodo(id));
    }
}

export const updateNotesAsync = (todo, newTodo) => {
    return (dispatch, getstate) => {
        const { uid } = getstate().auth;
        updateDoc(doc(db, `/${uid}/journal/toDoList/${todo.id}`), newTodo)
            .then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Updated'
                })
            }).catch(() => {
                Swal.fire('Error', 'Error try again', 'error')
            });
        dispatch(updateNote(todo.id, newTodo));
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

export const removeTodo = (id) => ({
    type: types.removeTodo,
    payload: id,
});
export const deleteTodo = (id) => ({
    type: types.deleteTodo,
    payload: id,
});

export const updateNote = ( id , note) => ({
    type: types.updateTodo,
    payload: {
        id,
        ...note
    }
});

export const activeNote = (note) => ({
    type: types.todoActive,
    payload: {
        ...note
    }
});
export const removeActiveTodo = () => ({
    type: types.removeTodoActive,
});
export const resetTodo = (id) => ({
    type: types.resetTodo,
    payload:id,
});