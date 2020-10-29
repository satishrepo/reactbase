import { post } from "../utils/HttpRequest"

const addCart = (item) => ({
    type: 'ADD_TO_CART',
    item
})
const removeCart = (item) => ({
    type: 'REMOVE_FROM_CART',
    item
})
const updateCartItem = (item, index) => ({
    type: 'UPDATE_CART',
    item,
    index
})

const saveCartInit = () => ({
    type: 'SAVE_CART_INIT'
})

const saveCartSuccess = (response) => ({
    type: 'SAVE_CART_SUCCESS',
    response
})

const saveCartFailure = (error) => ({
    type: 'SAVE_CART_FAILURE',
    error
})

export const saveCart = (cartData) => {
    return dispatch => {
        const options = {
            url: 'cart',
            data: cartData
        }
        dispatch(saveCartInit())
        post(options).then(response => {
            dispatch(saveCartSuccess(response))
        })
        .catch(error => {
            dispatch(saveCartFailure(error))
        })
    }
}

export const addToCart = (item) => {
    return (dispatch) => {
        dispatch(addCart(item))
    }
}

export const removeFromCart = (item) => {
    return dispatch => {
        dispatch(removeCart(item))
    }
}

export const updateCart = (item, index) => {
    return dispatch => {
        dispatch(updateCartItem(item, index))
    }
}