const INIT_STATE = {
    shippingAddress: {}
}

export default function shippingReducer(state = INIT_STATE, action) {

    switch (action.type) {
        case 'ADD_SHIPPING_ADDRESS':
            return {
                ...state,
                shippingAddress: action.shippingAddress
            }
        default:
            return state
    }
}