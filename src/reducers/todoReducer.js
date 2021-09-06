import { types } from "../types/types";

const initialState = {
    id:null,
    title: '',
    description: '',
    isdone:null,
}
export const todoReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.notesLoad:
        return {
            state: [ ...action.payload ],
        }
        case types.addNewNote: 
            return {
            state: [ action.payload, ...state.state ],
            }
        case types.removeNote: 
        return {   
            state: state.state.filter( note => note.id !== action.payload ),
            }
        case types.updateNote:
            return  {
                state: state.state.map( note => note.id === action.payload.id ?  action.payload  :  note   ),
            }
        // case types.noteDone: 
        //     return {
        //         state: state.state.map( note => note.id === action.payload.id? {...note, done:!action.payload.done }: note )
        //     }
            
        default:
            return state;
    }
}
