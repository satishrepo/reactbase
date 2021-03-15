import { get } from '../utils/HttpRequest'

const productListInit = () => ({
    type: 'PRODUCT_LIST_INIT',

})

const productListSuccess = (response) => ({
    type: 'PRODUCT_LIST_SUCCESS',
    response
})

const productListFailure = (error) => ({
    type: 'PRODUCT_LIST_FAILURE',
    error
})


export const productList = () => {
    return (dispatch) => {
        dispatch(productListInit)
        const options = {
            url: 'products'
        }
        get(options).then(response => {
            dispatch(productListSuccess(response.data.records))
        })
        .catch(error => {
            console.log(error);
            dispatch(productListFailure(error))
        })
    }
}

export const productUpdate = () => {
    return (dispatch) => {
        dispatch(productListSuccess([]))
    }
}