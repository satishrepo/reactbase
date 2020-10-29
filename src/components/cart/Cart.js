import React, { Fragment } from 'react'
import { Container, Paper, Grid, Button, TextField } from '@material-ui/core'

const Cart = props => {
    console.log('CART', props)
    const cartItems = props.cartData
    
    const removeItem = (item) => {
        props.removeFromCart(item)
    }

    const calculatePrice = (item, quantity) => {
        return Math.round(quantity * (item.price.sellPrice -  (item.price.sellPrice * ((item.price.discount || 0)/100))))
    }

    const onUpdateQuantity = (e, item, index) => {
        const { target } = e
        item['quantity'] = target.value
        item['totalPrice'] = calculatePrice(item, target.value)
        props.updateCart(item, index)
    }

    return (
        <Fragment>
            <Container maxWidth="md">
                <Paper>
                    {/* <Grid container spacing={5} > */}
                        {cartItems.map( (item, i) => (
                            <Grid container spacing={5} kye={item._id.toString()}>
                                <Grid item md={2}>
                                    <img src={item.images.length ? item.images[0].fileUrl : 'https://via.placeholder.com/300'} height="80px" alt={item.title}/>
                                </Grid>
                                <Grid item md={4}>
                                    {item.title} <br/>
                                    Price: {item.price.sellPrice} <br/>
                                    Discount: {item.price.discount}
                                </Grid>
                                <Grid item md={2}>
                                    <TextField label="Quantity" variant="outlined" value={item.quantity} onChange={(e) => onUpdateQuantity(e, item, i)} />
                                </Grid>
                                <Grid item md={2}>{item.totalPrice}</Grid>
                                <Grid item md={2} >
                                    <Button onClick={()=> removeItem(item)}>Remove</Button>
                                </Grid>
                            </Grid>
                        ))}
                    {/* </Grid> */}
                </Paper>
            </Container>
        </Fragment>
    )
}

export default Cart