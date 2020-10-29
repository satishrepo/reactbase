import { combineReducers } from 'redux';
import addUserReducer from './AddUser'
import viewUserReducer from './ViewUser'
import loginReducer from './Login'
import loadCategoryReducer from './MasterData'
import productListReducer from './ProductList'
import cartReducer from './Cart'

const mainReducer = combineReducers({
    addUserReducer,
    viewUserReducer,
    loginReducer,
    loadCategoryReducer,
    productListReducer,
    cartReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined
    }
    return mainReducer(state, action);
}

export default rootReducer;
