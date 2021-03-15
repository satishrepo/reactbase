import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Paper, Grid, Button, TextField } from '@material-ui/core'

const Cart = props => {
    console.log('CART', props)
    const cartItems = props.cartData

    const history = useHistory()
    
    const removeItem = (item) => {
        props.removeFromCart(item)
    }

    const calculatePrice = (item, quantity) => {
        return Math.round(quantity * (item.price.sellPrice -  (item.price.sellPrice * ((item.price.discount || 0)/100))))
    }

    const onChangeQuantity = (e, item, index) => { 
        const { target } = e
        const rex = /^[0-9\b]+$/
        if (target.value === '' || rex.test(target.value)) {
            const qty = isNaN(target.value) || target.value < 1 ? 1 : target.value
            item['quantity'] = qty
            console.log('key Up', qty, target.value)
            item['totalPrice'] = calculatePrice(item, qty)
            props.updateCart(item, index)
        }
    }


    return (
        <Fragment>
            <Container maxWidth="lg">
            {/* 
                 <Grid container spacing={5}>
                     <Grid item lg={8}> 
                        <Paper>
                     */}
                            {cartItems.map( (item, i) => (
                                <Grid container spacing={5} key={item.productId.toString()}>
                                    <Grid item md={2} sm={2}>
                                        <img src={item.image || 'https://via.placeholder.com/300'} height="80px" alt={item.title}/>
                                    </Grid>
                                    <Grid item md={4} sm={4}>
                                        {item.title} <br/>
                                        Price: {item.price.sellPrice} <br/>
                                        Discount: {item.price.discount}%
                                    </Grid>
                                    <Grid item md={2} sm={2}>
                                        <TextField 
                                            label="Quantity" 
                                            variant="outlined" 
                                            value={item.quantity} 
                                            onChange={(e) => onChangeQuantity(e, item, i)} 
                                        />
                                    </Grid>
                                    <Grid item md={2} sm={2}>{item.totalPrice}</Grid>
                                    <Grid item md={2} sm={2}>
                                        <Button onClick={()=> removeItem(item)}>Remove</Button>
                                    </Grid>
                                </Grid>
                            ))}
                        {/* 
                        </Paper>
                    </Grid>
                    <Grid item lg={4}>
                        <CartSummary/>
                    </Grid>
                </Grid>
            */}
            </Container> 
        </Fragment>
    )
}

export default Cart