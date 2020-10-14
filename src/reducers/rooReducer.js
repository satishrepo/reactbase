import { combineReducers } from 'redux';
import addUserReducer from './AddUser'
import viewUserReducer from './ViewUser'
import loginReducer from './Login'

const mainReducer = combineReducers({
    addUserReducer,
    viewUserReducer,
    loginReducer
})

const rootReducer = (state, action) => {
    return mainReducer(state, action);
}

export default rootReducer;
