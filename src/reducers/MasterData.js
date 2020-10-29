const INIT_STATE = {
    loadCategoryInit: false,
    loadCategorySuccess: false,
    loadCategoryFailure: false,
    loadCategoryStatus: '',
    loadCategoryResponse: {},
    loadCategoryError: {}
}

export default function loadCategoryReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case 'LOAD_CATEGORY_INIT': 
            return {
                ...state,
                loadCategoryInit: true
            }
        case 'LOAD_CATEGORY_SUCCESS': 
            return {
                ...state,
                loadCategoryInit: false,
                loadCategorySuccess: true,
                loadCategoryResponse: action.response
            }
        case 'LOAD_CATEGORY_FAILURE': 
            return {
                ...state,
                loadCategoryInit: false,
                loadCategoryFAilure: true,
                loadCategoryError: action.error
            }
        default:
            return state
    }
}