import { types } from '../types/types';
const initialState = {
  lenguague: 'english',
}

export const lenguagueReducer = (state = initialState, action) => {
    switch(action?.type){
      case types.spanish:
      return {
        ...state,
        lenguague: 'spanish',
      }
      case types.english:
      return {
        ...state,
        lenguague: 'english',
      }
      default:
      return state;
    }
}
