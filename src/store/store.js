import thunk from 'redux-thunk';
import { createStore, combineReducers,applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { loadingReducer } from '../reducers/loadingReducer';
import { menuState } from '../reducers/menuState';
import { todoReducer } from '../reducers/todoReducer';
import { modalReducer } from '../reducers/modalReducer';
import { activeReducer } from '../reducers/activeReducer';
import { notesReducer } from '../reducers/notesReducer';
import { lenguagueReducer } from '../reducers/lenguagueReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    loading: loadingReducer,
    menuStatus: menuState,
    todos: todoReducer,
    modal: modalReducer,
    active: activeReducer,
    notes: notesReducer,
    lenguague: lenguagueReducer,
});


export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)
