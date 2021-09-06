import { types } from "../types/types";

export const showMenu = () => ({
    type: types.showMenu,
    payload:{
        status:true
    }
});

export const hiddeMenu = () => ({
    type: types.hiddeMenu,
    payload: {
        status:false,
    }
})