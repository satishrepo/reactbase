import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles, Typography, Container, Paper, Grid, TextField, Button } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { get, post, put } from '../../utils/HttpRequest'
import { useSnackbar } from 'notistack'

const AddShipping = props => {

    const { updateShippingList, setIsNewShipping, editShipping } = props

    const initShipping =  {
        name: '',
        phone: '',
        address: '',
        pin: '',
        state: {
            title: '',
            id: ''
        },
        city: {
            title: '',
            id: ''
        }
    }

    const [shippingModel, setShippingModel] = useState(initShipping)
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

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

    const defaultStateProps = {
        options: stateList,
        getOptionLabel: (option) => {
            return typeof option === 'string' ? option : option.title 
        }
    }

    const defaultCityProps = {
        options: cityList,
        getOptionLabel: (option) => {
            return typeof option === 'string' ? option : option.title 
        }
    }

    useEffect(() => {
        getStateList()
    }, [])

    useEffect(() => {
        if (Object.keys(editShipping).length) {
            setShippingModel(editShipping)
        }
    }, [editShipping])

    const getStateList = () => {
        const options = {
            url: 'state'
        }
        get(options).then(response => {
            if (response.statusCode === 200) {
                setStateList(response.data.records)
            }
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    const getCityList = (stateId) => {
        const options = {
            url: 'city/'+stateId
        }
        get(options).then(response => {
            if (response.statusCode === 200) {
                setCityList(response.data.records)
            }
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    const handleOnChange = (e, name) => {
        const { target } = e
        setShippingModel({...shippingModel, [name]: target.value})

    }

    const onSelectState = (e, state) => {
        if (state) {
            let copyShipping = {...shippingModel}
            copyShipping['state'] = {
                title: state.title,
                id: state._id
            }
            setShippingModel({...copyShipping})
            getCityList(state._id)
        }
    }

    const onSelectCity = (e, city) => {
        if (city) {
            let copyShipping = {...shippingModel}
            copyShipping['city'] = {
                title: city.title,
                id: city._id
            }
            setShippingModel({...copyShipping})
        }
    }

    const onSave = () => {
        let options = {
            url: 'users/shipping',
            data: shippingModel
        }
        
        let request = '';
        if (shippingModel._id) {
            options.url = 'users/shipping/' + shippingModel._id
            request = put(options)
        } else {
            request = post(options)
        }
        
        request.then((response) => {
            enqueueSnackbar('Shipping address added successfully', { variant: 'success' });
            setShippingModel({...initShipping})
            updateShippingList(true)
            setIsNewShipping(false)
        })
        .catch((err) =>{
            console.log('Add product Error', err)
        })
    }


    return (
        <Fragment>
            <Container maxWidth="sm">
                
                <Paper>
                    <div style={{margin: '15px'}}>
                        <Grid container spacing={2} >
                            <Typography display="inline" align="center" variant="h6" className={classes.typography}>Shippping Info</Typography>
                        </Grid>

                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField 
                                    label="Name" 
                                    name="name" 
                                    onChange={(e) => handleOnChange(e, 'name')}
                                    value={shippingModel.name} 
                                    // helperText={shippingModel.discountError}
                                    fullWidth autoFocus required
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField 
                                    label="Phone" 
                                    name="phone" 
                                    onChange={(e) => handleOnChange(e, 'phone')}
                                    value={shippingModel.phone} 
                                    // helperText={shippingModel.discountError}
                                    fullWidth autoFocus required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={true} sm={true} md={true}>
                                <TextField 
                                    label="Address" 
                                    name="address" 
                                    onChange={(e) => handleOnChange(e, 'address')}
                                    value={shippingModel.address} 
                                    // helperText={shippingModel.discountError}
                                    fullWidth autoFocus required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={true} sm={true} md={true}>
                                <TextField 
                                    label="Pin" 
                                    name="pin" 
                                    onChange={(e) => handleOnChange(e, 'pin')}
                                    value={shippingModel.pin} 
                                    // helperText={shippingModel.discountError}
                                    fullWidth autoFocus required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={6} sm={6} md={6}>
                                <Autocomplete
                                    {...defaultStateProps}
                                    id="state"
                                    debug
                                    renderInput={(params) => <TextField {...params} label="State"/>}
                                    onChange={(e, value) => onSelectState(e, value)}  
                                    value={shippingModel.state}
                                    getOptionSelected={option => option._id === shippingModel.state}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <Autocomplete
                                    {...defaultCityProps}
                                    id="city"
                                    debug
                                    renderInput={(params) => <TextField {...params} label="City"/>}
                                    onChange={(e, value) => onSelectCity(e, value)} 
                                    value={shippingModel.city} 
                                    getOptionSelected={option => option._id === shippingModel.city}
                                />
                            </Grid>
                        </Grid>
                
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={true} sm={true} md={true}>
                                <Button variant="contained" color="primary" onClick={() => onSave()}>Save</Button>    
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Container>
        </Fragment>
    )
}

export default AddShipping;