import React, { Fragment, useState, useEffect } from 'react'
import AddShipping from './AddShipping'
import ListShipping from '../../containers/ListShipping'
import CartSummary from '../../containers/CartSummary'
import Cart from '../../containers/Cart'
import Payment from './Payment'
import { makeStyles, Typography, Container, Paper, Grid, TextField, Button, Divider } from '@material-ui/core'
import { get, post } from '../../utils/HttpRequest'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Order = props => {

    const [updateShippingList, setUpdateShippingList] = useState(false)
    const [editShipping, setEditShipping] = useState({})
    const [isNewShipping, setIsNewShipping] = useState(false)

    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(2),
        },
        padding: {
            padding: theme.spacing(1)
        },
        typography: {
            flexGrow: 1,
            align: "center"
        }
            
    }))

    const classes = useStyles()

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    useEffect( () => {

        if (Object.keys(editShipping).length) {
            setIsNewShipping(true)
        }

    }, [editShipping])

    const addShippingButton = () => {
        return <Grid item md={true} sm={true} xs={true}>
            <Button variant="contained" color="primary" onClick={ () => addShipping(true) } >Add New Shipping</Button>
            {
                isNewShipping ? 
                <Button variant="contained" color="secondary" onClick={ () => addShipping(false) } >Cancle</Button>
                : ''
            }
        </Grid>}
    

    const addShipping = (isShow) => {
        setIsNewShipping(isShow)
        setEditShipping({})
    }

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                   <Grid item md={8}>
                    <div className={classes.root}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header">
                                <Typography className={classes.heading}>Shipping</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <ListShipping 
                                            updateShippingList={updateShippingList}
                                            setUpdateShippingList={setUpdateShippingList}
                                            setEditShipping={setEditShipping}
                                        />
                                    </Grid>
                                    <Divider light style={{width: '100%'}}/>
                                    <Grid item md={12} sm={12} xs={12}>
                                    </Grid>
                                    {
                                        isNewShipping ? 
                                            <Grid item md={12} sm={12} xs={12}>
                                                <AddShipping 
                                                    updateShippingList={setUpdateShippingList}
                                                    setIsNewShipping={setIsNewShipping}
                                                    editShipping={editShipping}
                                                />
                                            </Grid>
                                        : ''
                                    }
                                    {addShippingButton()}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography className={classes.heading}>Order Summary</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                               
                                <Cart/>
                               
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            >
                            <Typography className={classes.heading}>Payment</Typography>
                            <Typography className={classes.secondaryHeading}>
                                Choose Payment Method
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Payment />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography className={classes.heading}>Personal data</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                    vitae egestas augue. Duis vel est augue.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        </div>
                    </Grid> 

                    <Grid item md={4}>
                        <CartSummary />
                    </Grid>
                    
                </Grid>
            </Container>
        </Fragment>
    )
}

export default Order