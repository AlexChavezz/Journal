import { types } from "../types/types";

export const showModalAdd = () =>({
    type:types.modeAdd,
    payload: 'add'
});

export const showModalEdit = () => ({
    type: types.modeEdit,
    payload: 'edit'
});