import { types } from "../types/types";

const initialState ={
    mode: 'add',
}

export const modalReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.modeAdd:
             return {
                mode: action.payload,
            }
        case types.modeEdit:
            return {
                mode: action.payload,
            }            
        default:
            return state;
    }
}
