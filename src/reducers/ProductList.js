const INIT_STATE = {
    productListInit: false,
    productListSuccess: false,
    productListFailure: false,
    productListResponse: [],
    productListError: {},
    // productUpdated: false
}

export default function productListReducer(state = INIT_STATE, action) {
    switch(action.type) {
        case 'PRODUCT_LIST_INIT':
            return {
                ...state,
                productListInit: true
            }
        case 'PRODUCT_LIST_SUCCESS':
            return {
                ...state,
                productListInit: false,
                productListSuccess: true,
                // productUpdated: false,
                productListResponse: action.response
            }
        case 'PRODUCT_LIST_FAILURE':
            return {
                ...state,
                productListInit: false,
                productListFailure: true,
                productListError: action.error
            }
        default: 
            return state
    }
}