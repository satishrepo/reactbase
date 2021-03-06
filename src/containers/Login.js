import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, logout } from '../actions/Login'
import { loadCategory } from '../actions/MasterData'
import Login from '../components/Login'

const mapStateToProps = state => {
    return {
        loginInit: state.loginReducer.loginInit,
        loginSuccess: state.loginReducer.loginSuccess,
        loginError: state.loginReducer.loginError,
        loginStatus: state.loginReducer.loginStatus,
        loginResponse: state.loginReducer.loginResponse,
        loginInProgress: state.loginReducer.loginInProgress,

        loadCategoryInit: state.loadCategoryReducer.loadCategoryInit,
        loadCategorySuccess: state.loadCategoryReducer.loadCategorySuccess,
        loadCategoryFailure: state.loadCategoryReducer.loadCategoryFailure,
        loadCategoryStatus: state.loadCategoryReducer.loadCategoryStatus,
        loadCategoryResponse: state.loadCategoryReducer.loadCategoryResponse,
        loadCategoryError: state.loadCategoryReducer.loadCategoryError,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        login,
        logout,
        loadCategory
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)