import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewUser, updateUser } from '../actions/ViewUser';
import ViewUser from '../user/ViewUser';

const mapStateToProps = state => {
    return {
        viewUserInit: state.viewUserReducer.viewUserInit,
        viewUserSuccess: state.viewUserReducer.viewUserSuccess,
        viewUserFailed: state.viewUserReducer.viewUserFailed,
        viewUserStatus: state.viewUserReducer.viewUserStatus,
        viewUserResponse: state.viewUserReducer.viewUserResponse,
        viewUserError: state.viewUserReducer.viewUserError,
        viewUserUpdate: state.viewUserReducer.viewUserUpdate
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        viewUser,
        updateUser
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);