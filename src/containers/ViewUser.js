import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewUser, updateUser } from '../actions/ViewUser';
import { logout } from '../actions/Login'
import ViewUser from '../components/user/ViewUser';

const mapStateToProps = state => {
    return {
        viewUserInit: state.viewUserReducer.viewUserInit,
        viewUserSuccess: state.viewUserReducer.viewUserSuccess,
        viewUserFailed: state.viewUserReducer.viewUserFailed,
        viewUserStatus: state.viewUserReducer.viewUserStatus,
        viewUserResponse: state.viewUserReducer.viewUserResponse,
        viewUserError: state.viewUserReducer.viewUserError,
        viewUserUpdate: state.viewUserReducer.viewUserUpdate,
        viewUserStatusCode: state.viewUserReducer.viewUserStatusCode   
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        viewUser,
        updateUser,
        logout
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);