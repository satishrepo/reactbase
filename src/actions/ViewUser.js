import axios from 'axios'
import { getLocalStorage } from '../common/services/LocalStorage'

axios.interceptors.request.use(req => {
    // console.log('Request intercepto', req, )
    const token = getLocalStorage('authToken')
    if (!req.url.includes('/login')) {
        req.headers["Authorization"] = token.token
    }
    return req
    }, error=>{
        return Promise.reject(error);
    }
);


axios.interceptors.response.use(res => {
    console.log('Response interceptor ------ ', res)
    return res
    // if (axios.defaults.headers.common["Authorization"]) {
    //     // return req
    //     // throw ({message:"the token is not available"});
    // };
   },error=>{
        return Promise.reject(error);
   }
);

const viewUserInit = () => ({
    type: 'VIEW_USER_INIT'
})

const viewUserCompleted = (response, statusCode) => ({
    type: 'VIEW_USER_COMPLETED',
    response,
    statusCode
})

const viewUserFailed = (error, statusCode) => ({
    type: 'VIEW_USER_FAILED',
    error,
    statusCode
})

const viewUserUpdate = (updateData) => ({
    type: 'VIEW_USER_UPDATE',
    updateData
})

export const viewUser = (pageObj) => {
    return (dispatch) => {
        dispatch(viewUserInit());
        axios.get(`http://localhost:3001/users?currentPage=${pageObj.currentPage}&perPage=${pageObj.perPage}`)
        .then(response => {
            
            dispatch(viewUserCompleted(response.data.data, response.data.data.statusCode))
            
        })
        .catch(function (error) { 
            if (error && error['response']) {
                dispatch(viewUserFailed(error, error['response']['status']));
            } else {
                dispatch(viewUserFailed(error, null));
            }
        });
    }
}

export const updateUser = (updateData) => {
    return (dispatch) => {
        dispatch((viewUserUpdate(updateData)))
    }
}