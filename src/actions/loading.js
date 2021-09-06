import { types } from "../types/types";

export const startLodingPage = () => ({
    type:types.startloading,
    payload: {
        loading:true,
    },
});
export const stopLoadingPage = () => ({
    type: types.stoploading,
    payload: {
        loading:false,
    }
});