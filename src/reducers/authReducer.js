import { types } from "../types/types";



export const authReducer = (state = {}, action) => {

    switch (action?.type) {
        case types.login: {
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                photoURL: action.payload.photoURL,
            }
        }
        case types.changeName:
            return {
                ...state,
                name: action.payload
            }
        case types.changephotoURL:
            return {
                ...state,
                photoURL: action.payload
            }

        case types.logout: {
            return {

            }
        }
        default:
             return state;
    }

}
