import axios from 'axios'
import { getLocalStorage } from '../common/services/LocalStorage'

axios.interceptors.request.use(req => {
    // console.log('Request intercepto', req, axios.defaults.headers)
    const token = getLocalStorage('authToken')
    if (!req.url.includes('/login')) {
        req.headers["Authorization"] = token.token
    }
    return req
   },error=>{
        return Promise.reject(error);
   }
);


/* axios.interceptors.response.use(res => {
    console.log('Response intercepto', res, axios.defaults.headers)
    return res
    // if (axios.defaults.headers.common["Authorization"]) {
    //     // return req
    //     // throw ({message:"the token is not available"});
    // };
   },error=>{
        return Promise.reject(error);
   }
); */

const viewUserInit = () => ({
    type: 'VIEW_USER_INIT'
})

const viewUserCompleted = (response) => ({
    type: 'VIEW_USER_COMPLETED',
    response
})

const viewUserFailed = (error) => ({
    type: 'VIEW_USER_FAILED',
    error
})

const viewUserUpdate = (updateData) => ({
    type: 'VIEW_USER_UPDATE',
    updateData
})

export const viewUser = () => {
    return (dispatch) => {
        dispatch(viewUserInit());
        axios.get('http://localhost:3001/users')
        .then(response => {
            dispatch(viewUserCompleted(response.data.data));
        })
        .catch(function (error) {
            dispatch(viewUserFailed(error));
        });
    }
}

export const updateUser = (updateData) => {
    return (dispatch) => {
        dispatch((viewUserUpdate(updateData)))
    }
}