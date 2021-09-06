import { types } from "../types/types";

const initialState = {
    id:'',
}
export const activeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.noteActive:
            
            return {
                id: action.payload,
            }
        case types.removeNoteActive:
            return {
                id:'',
            }
        default:
            return state;
    }
}
