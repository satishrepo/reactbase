import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addShipping } from '../actions/Shipping'
import ListShipping from '../components/checkout/ListShipping'

const mapStateToProps = state => {
    return {
        shipingAddress: state.shippingReducer.shippingAddress
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        addShipping
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListShipping)