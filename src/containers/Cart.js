import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveCart, removeFromCart, updateCart } from '../actions/Cart'
import Cart from '../components/cart/Cart'

const mapStateToProps = state => {
    return {
        cartData: state.cartReducer.cartData,
        cartInit: state.cartReducer.cartInit,
        cartSuccess: state.cartReducer.cartSuccess,
        cartFailure: state.cartReducer.cartFailure
    }
}

const mapDispatchToProps = (dispatch) => 
    bindActionCreators({
        saveCart,
        removeFromCart,
        updateCart
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)