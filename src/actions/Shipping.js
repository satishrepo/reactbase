const addShippingAddress = (shippingAddress) => ({
    type: 'ADD_SHIPPING_ADDRESS',
    shippingAddress
})


export const addShipping = (shippingAddress) => {
    return (dispatch) => {
        dispatch(addShippingAddress(shippingAddress))
    }
}