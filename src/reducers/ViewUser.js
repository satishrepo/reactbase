const INIT_STATE = {
    viewUserInit: false,
    viewUserSuccess: false,
    viewUserFailed: false,
    viewUserStatus: '',
    viewUserResponse: [],
    viewUserError: {},
    viewUserUpdate: false
}

export default function viewUserReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case 'VIEW_USER_INIT':
            return {
                ...state,
                viewUserInit: true,
                viewUserStatus: 'init',
            }
        case 'VIEW_USER_COMPLETED':
            return {
                ...state,
                viewUserInit: false,
                viewUserSuccess: true,
                viewUserStatus: 'success',
                viewUserResponse: action.response
            }
        case 'VIEW_USER_FAILED':
            return {
                ...state,
                viewUserInit: false,
                viewUserSuccess: false,
                viewUserFailed: true,
                viewUserStatus: 'failed',
                viewUserError: action.error
            }
            case 'VIEW_USER_UPDATE':
                return {
                    ...state,
                    viewUserUpdate: true,
                    viewUserResponse: action.updateData
                }
        default:
            return state
    }
}