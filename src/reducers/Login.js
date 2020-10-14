import { getLocalStorage } from '../common/services/LocalStorage'

const INIT_STATE = {
    loginInit: false,
    loginSuccess: false,
    loginError: 0,
    loginStatus: getLocalStorage('loggedUser') ? true : false,
    loginResponse: {},
    loginInProgress: false
}

export default function loginReducer(state = INIT_STATE, action) {
    switch(action.type) {
        case 'LOGIN_INIT': 
            return {
                ...state,
                loginInit: true,
                loginError: 0,
                loginResponse: {},
                loginInProgress: true
            }
        case 'LOGIN_SUCCESS': 
            return {
                ...state,
                loginInit: false,
                loginSuccess: true,
                loginStatus: true,
                loginInProgress: false,
                loginResponse: action.response
            }
        case 'LOGIN_FAILED': 
            return {
                ...state,
                loginInit: false,
                loginError: action.errorType,
                loginStatus: false,
                loginInProgress: false,
                loginResponse: action.error
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                loginStatus: false,
                loginInProgress: false,
                loginResponse: {}
            }
        default:
            return state
    }
}