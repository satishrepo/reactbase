import { post } from '../utils/HttpRequest'

const loginInit = () => ({
    type: 'LOGIN_INIT'
})

const loginSuccess = (response) => ({
    type: 'LOGIN_SUCCESS',
    response
})

const loginFailed = (error, errorType) => ({
    type: 'LOGIN_FAILED',
    error,
    errorType
})

const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS'
})

export const login = (userData) => {
    return dispatch => {
        dispatch(loginInit())
        const options = {
            url: 'users/login', 
            data: userData
        }
        post(options).then(response => { 
            const res = response
            if(res.statusCode === 200) {
                dispatch(loginSuccess(res.data))
            } else if (res.statusCode === 400) {
                dispatch(loginFailed(res.validationErrors.message, 1))
            } else {
                dispatch(loginFailed(res.data, 2))
            }
        })
        .catch(function (error) {
            console.log(error);
            dispatch(loginFailed(error, 3))
        });
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(logoutSuccess())
    }
}