import { types } from "../types/types";

const initialState ={
    status: false,
}

export const menuState = (state = initialState, action) => {
    switch (action.type) {
        case types.showMenu:
            return {
                ...state,
                status: action.payload.status,
            }
        case types.hiddeMenu:
            return {
                ...state,
                status: action.payload.status,
            }
        default:
            return state;
    }
}
