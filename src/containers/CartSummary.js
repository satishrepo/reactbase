import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveCart, removeFromCart, updateCart } from '../actions/Cart'
import CartSummary from '../components/cart/CartSummary'

const mapStateToProps = state => {
    return {
        cartData: state.cartReducer.cartData
    }
}

const mapDispatchToProps = (dispatch) => 
    bindActionCreators({
        // saveCart,
        // removeFromCart,
        // updateCart
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)