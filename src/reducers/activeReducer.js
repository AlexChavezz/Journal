import { types } from "../types/types";

const initialState = {
    titleActive: null, 
    descriptionActive: null,
    idActive:null,
    notes:{
        id: null,
        note: '',
        date: null,
        isEliminated: false
    }
}
export const activeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.todoActive:
            
            return {
                ...action.payload
            }
        case types.removeTodoActive:
            return initialState;
        case types.noteActive:
            return {
                ...state,
                notes: action.payload
            } 
        case types.removeActiveNote:
            return initialState;
        default:
            return state;
    }
}
