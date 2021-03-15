import { get } from '../utils/HttpRequest'

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
        const options = {
            url: `users?currentPage=${pageObj.currentPage}&perPage=${pageObj.perPage}`
        }
        get(options).then(response => {
            dispatch(viewUserCompleted(response.data, response.statusCode))
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