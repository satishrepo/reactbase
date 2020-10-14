const INIT_STATE = {
  addUserInit: false,
  addUserSuccess: false,
  addUserFailed: false,
  addUserError: {},
  addUserResponse: {},
  addUserStatus: ''
}


export default function userReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case 'ADD_USER_INIT':
      return {
        ...state,
        addUserInit: true,
        addUserSuccess: false,
        addUserStatus: 'init'
      }
    case 'ADD_USER_COMPLETED':
      return {
        ...state,
        addUserInit: false,
        addUserSuccess: true,
        addUserResponse: action.payload,
        addUserStatus: 'success'
      }
    case 'ADD_USER_FAILED':
      return {
        ...state,
        addUserInit: false,
        addUserSuccess: false,
        addUserFailed: true,
        addUserError: action.error,
        addUserStatus: 'failed'
      }
    default:
      return state
  }
}