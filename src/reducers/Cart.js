const INIT_STATE = {
    cartData: [],
    cartInit: false,
    cartSuccess: false,
    cartFailure: false
}

export default function cartReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartData: [...state.cartData, ...[action.item]]
            }
        case 'REMOVE_FROM_CART': 
            return {
                ...state,
                cartData: [...state.cartData.filter( item => item.productId !== action.item.productId)]
            }
        case 'UPDATE_CART': 
            state.cartData.splice(action.index, 1, action.item)
            return {
                ...state,
                // cartData: [...state.cartData.filter( item => item._id !== action.item._id)]
                cartData: [...state.cartData]
            }
        case 'SAVE_CART_INIT':
            return {
                ...state,
                cartInit: true
            }
        case 'SAVE_CART_SUCCESS':
            return {
                ...state,
                cartSuccess: true,
                cartInit: false
            }
        case 'SAVE_CART_FAILURE':
            return {
                ...state,
                cartFailure: true,
                cartInit: false
            }
        default: 
            return state
    }
}