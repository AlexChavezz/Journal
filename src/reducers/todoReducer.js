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
        case types.removeTodo: 
        return {   
                state: state.state.map( note => note.id === action.payload? { ...note, isEliminated: true } : note )
            }
        case types.deleteTodo: 
            return {
                state: state.state.filter( note => note.id !== action.payload )
            }
        case types.updateTodo:
            return  {
                state: state.state.map( note => note.id === action.payload.id ?  action.payload  :  note ),
            }
        case types.resetTodo:
            return {
                state: state.state.map( note => note.id === action.payload? { ...note, isEliminated: false } : note )
            }
        // case types.noteDone: 
        //     return {
        //         state: state.state.map( note => note.id === action.payload.id? {...note, done:!action.payload.done }: note )
        //     }
        case types.emptyTodos:
            return {
                state: state.state = []
            };
        default:
            return state;
    }
}
