import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadCategory } from '../actions/MasterData'
import { productUpdate } from '../actions/ProductList'
import AddProduct from '../components/product/AddProduct'

const mapStateToProps = state => {
    return {
        loadCategoryInit: state.loadCategoryReducer.loadCategoryInit,
        loadCategorySuccess: state.loadCategoryReducer.loadCategorySuccess,
        loadCategoryFailure: state.loadCategoryReducer.loadCategoryFailure,
        loadCategoryStatus: state.loadCategoryReducer.loadCategoryStatus,
        loadCategoryResponse: state.loadCategoryReducer.loadCategoryResponse,
        loadCategoryError: state.loadCategoryReducer.loadCategoryError,
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        loadCategory,
        productUpdate
    }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)