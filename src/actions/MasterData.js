import axios from 'axios'

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
        axios.get('http://localhost:3001/category')
        .then((response) => {
            const data = response.data.data
            dispatch(loadCategorySuccess(data))
        })
        .catch((error) => {
            dispatch(loadCategoryFailure(error))
        })
    }
}