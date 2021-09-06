import { types } from "../types/types";

const initialState = [{
    date: null,
    notes:'',
}];

export const notesReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.loadNote:
            return {
                state: [ ...action.payload ],
            }
        case types.addNote:
            console.log(state)
        return {
            state: [ action.payload, ...state.state ]
        }
        case types.deleteNote:
        return {
            state: state.state.filter( note => note.id !== action.payload )
        }
            
        default:
            return state;
    }
}
