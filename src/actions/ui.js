import { types } from "../types/types";

export const startLoading = () => ({
    type: types.uiStartLoaading,
})
export const finishLoading = () => ({
    type: types.finishLoading,
})
export const setError = ( error ) => ({
    type: types.uiSetError,
    payload: error
})
export const removeError = () => ({
    type: types.uiRemoveError,
})