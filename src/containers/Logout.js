import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions/Login'
import Logout from '../components/Logout'

const mapStateToProps = state => {
    return {
        loginStatus: state.loginReducer.loginStatus
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        logout
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)