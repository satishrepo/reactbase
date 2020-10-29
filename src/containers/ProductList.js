import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { productList } from '../actions/ProductList'
import { addToCart } from '../actions/Cart'
import ProductList from '../components/product/ProductsList'

const mapStateToProps = state => {
    return {
        productListInit: state.productListReducer.productListInit,
        productListSuccess: state.productListReducer.productListSuccess,
        productListFailure: state.productListReducer.productListFailure,
        productListResponse: state.productListReducer.productListResponse,
        productListError: state.productListReducer.productListError
    }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        productList,
        addToCart
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
