import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

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