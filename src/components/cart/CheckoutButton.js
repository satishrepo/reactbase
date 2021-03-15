import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Paper, Grid, Button, TextField } from '@material-ui/core'

const CheckoutButton = props => {

    const history = useHistory()

    const saveCart = () => {

        history.push('/order')

        /* 
        const options = {
            url: 'cart',
            data: {
                cartData: props.cartData
            }
        }

        post(options).then(response => {
            console.log(response)
            if (response.statusCode === 200) {
                // const cartId = response.data.record._id
                history.push('/shipping')
            } else {
                // show error message
            }
        })
        .catch(error => {
            console.log(error)
        }) 
        */
    }

    return (
        <Paper>
            <Grid container spacing={5} > 
                <Grid item md={9}></Grid>
                <Grid item md={3}>
                    <Button variant="contained" color="primary" onClick={() => saveCart()} >Place Order </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CheckoutButton