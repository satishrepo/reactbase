import { post } from '../utils/HttpRequest'

const addUserInit = () => ({
  type: 'ADD_USER_INIT'
})

const addUserCompleted = (payload) => ({
  type: 'ADD_USER_COMPLETED',
  payload
})

const addUserFailed = (error) => ({
  type: 'ADD_USER_FAILED',
  error
})
  
export const addUser = (payload) => {
  return (dispatch) => {
    dispatch(addUserInit())
    const options = {
      url: 'users', 
      data: payload
    }
    post(options).then(result => {
      if (result.statusCode === 200) {
        dispatch(addUserCompleted(result.data))
      } else {
        dispatch(addUserFailed(result))
      }
    })
    .catch(error => {
      dispatch(addUserFailed(error))
    })
  }
}