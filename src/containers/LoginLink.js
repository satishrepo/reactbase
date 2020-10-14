import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions/Login'
import LoginLink from '../components/LoginLink'

const mapStateToProps = state => {
    return {
        loginStatus: state.loginReducer.loginStatus
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        logout
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginLink)