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
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
    dispatch(addUserInit())
    fetch('http://localhost:3001/users', params)
    .then(response => response.json())
    .then(result => {
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