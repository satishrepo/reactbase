import axios from 'axios'
import { getLocalStorage } from '../common/services/LocalStorage'
const BASE_URL = 'http://localhost:3001'


axios.interceptors.request.use(req => {
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
    return res.data
   }, error => {
        return Promise.reject(error);
   }
);

export const post = (options) => {
    return axios({
        url: `${BASE_URL}/${options.url}`,
        method: 'POST',
        data: options.data,
        headers: { 
            'Content-Type': 'Application/json' 
        }
    })
}

export const get = (options) => {
    return axios({
        url: `${BASE_URL}/${options.url}`,
        method: 'GET',
        headers: { 
            'Content-Type': 'Application/json' 
        }
    })
}

export const put = (options) => {
    return axios({
        url: `${BASE_URL}/${options.url}`,
        method: 'PUT',
        data: options.data,
        headers: { 
            'Content-Type': 'Application/json' 
        }
    })
}

export const remove = (options) => {
    return axios({
        url: `${BASE_URL}/${options.url}`,
        method: 'DELETE',
        data: options.data,
        headers: { 
            'Content-Type': 'Application/json' 
        }
    })
}