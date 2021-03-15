import { get } from '../utils/HttpRequest'

const loadCategoryInit = () => ({
    type: 'LOAD_CATEGORY_INIT'
})

const loadCategorySuccess = (response) => ({
    type: 'LOAD_CATEGORY_SUCCESS',
    response
})

const loadCategoryFailure = (error) => ({
    type: 'LOAD_CATEGORY_FAILURE',
    error
})


export const loadCategory = () => {
    return (dispatch) => {
        dispatch(loadCategoryInit())
        const options = {
            url: 'category'
        }
        get(options).then((response) => { 
            // const data = response.data
            dispatch(loadCategorySuccess(response))
        })
        .catch((error) => {
            dispatch(loadCategoryFailure(error))
        })
    }
}