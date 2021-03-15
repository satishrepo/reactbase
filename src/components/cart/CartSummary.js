import React, { useEffect, useState, Fragment } from 'react'
import { Container, Paper, Grid, Button, TextField } from '@material-ui/core'

const CartSummary = props => {

    const cartData = props.cartData
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() =>{
        const sum = cartData.reduce((a, b) => {
            return a + b.totalPrice
        }, 0)

        setCartTotal(sum)
    }, [])
    return (
        <Fragment>
            <Paper>
                <Grid>
                    Total Item(s): {cartData.length}
                </Grid>
                <Grid>
                    Total Price: {cartTotal}
                </Grid>
            </Paper>
        </Fragment>
    )
}

export default CartSummary