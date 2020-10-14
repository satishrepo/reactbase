import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, logout } from '../actions/Login'
import Login from '../components/Login'

const mapStateToProps = state => {
    return {
        loginInit: state.loginReducer.loginInit,
        loginSuccess: state.loginReducer.loginSuccess,
        loginError: state.loginReducer.loginError,
        loginStatus: state.loginReducer.loginStatus,
        loginResponse: state.loginReducer.loginResponse,
        loginInProgress: state.loginReducer.loginInProgress
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        login,
        logout
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)