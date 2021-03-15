import React, { Fragment } from 'react'
import Cart from '../../containers/Cart'
import CartSummary from '../../containers/CartSummary'
import CheckoutButton from './CheckoutButton'
import { Container, Paper, Grid, Button, TextField } from '@material-ui/core'

const Index = props => {
    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item lg={8}>
                        <Paper>
                            <Cart />
                        </Paper>
                        <CheckoutButton />
                    </Grid>
                    <Grid item lg={4}>
                        <CartSummary/>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default Index