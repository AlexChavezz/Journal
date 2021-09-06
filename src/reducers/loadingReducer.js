import { types } from "../types/types";

const initialState = {
    loading: true,
}


export const loadingReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.startloading:
            return {
                ...state,
                loading: action.payload.loading
            }
            case types.stoploading:
                return {
                    ...state,
                    loading: action.payload.loading
                }
            
        default:
            return state;
    }
}
