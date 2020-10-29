import axios from 'axios'

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
        axios.get('http://localhost:3001/products')
        .then(response => {
            dispatch(productListSuccess(response.data.data.records))
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