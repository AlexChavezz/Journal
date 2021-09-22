import { types } from "../types/types";

const initialState = {
    titleActive: null, 
    descriptionActive: null,
    id:null,
}
export const activeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.noteActive:
            
            return {
                ...action.payload
            }
        case types.removeNoteActive:
            return {
                titleActive: null, 
                descriptionActive: null,
                id:null,       
            }
        default:
            return state;
    }
}
