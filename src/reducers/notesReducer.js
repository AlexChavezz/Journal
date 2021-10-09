import { types } from "../types/types";

const initialState = {
    date: null,
    notes: [],
    active:{}
};

export const notesReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.loadNote:
            return {
                state: [ ...action.payload ],
            }
        case types.addNote:
            return {
                state: [ action.payload, ...state.state ]
            }

        case types.removeNote:
            return {
                state: state.state.map(note => note.id === action.payload ? { ...note, isEliminated: true } : note)
            }
        case types.deleteNote:
            return {
                state: state.state.filter(note => note.id !== action.payload)
            }
        case types.resetNote:
            return {
                state: state.state.map( note => note.id === action.payload? { ...note, isEliminated: false }: note)
            }
        case types.updateNote:
            return {
                state: state.state.map( note => note.id === action.payload.id ? action.payload : note)
            }
        case types.emptyNotes:
            return {
                state: state = []
            };
        default:
            return state;
    }
}
