import axios from 'axios'

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
        axios.post('http://localhost:3001/users/login', userData)
        .then(response => { 
            const res = response.data
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