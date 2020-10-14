import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser } from '../actions/AddUser';
import AddUser from '../user/AddUser';

const mapStateToProps = state => {
    return {
        addUserInit: state.addUserReducer.addUserInit,
        addUserSuccess: state.addUserReducer.addUserSuccess,
        addUserFailed: state.addUserReducer.addUserFailed,
        addUserError: state.addUserReducer.addUserError,
        addUserResponse: state.addUserReducer.addUserResponse,
        addUserStatus: state.addUserReducer.addUserStatus
    }
}

const mapDispatchToProps = (dispatch) => 
    bindActionCreators({
        addUser
    }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AddUser)
