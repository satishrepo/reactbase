import React, {Fragment} from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'

const Payment = props => {

    return (
        <Fragment>
            <Paper>
                <Grid container spacing={2} >
                    <Grid item>
                        <Typography>Crdit Card</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Net Banking</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Cash on Delivery</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Fragment>
    )

}

export default Payment