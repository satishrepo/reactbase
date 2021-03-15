import React, { useState, useEffect, useCallback } from 'react'
import { get, remove } from '../../utils/HttpRequest'
import { Container, Paper, Grid, Button, Typography } from '@material-ui/core'

const ListShipping = props => {
    
    const { updateShippingList, setUpdateShippingList, setEditShipping } = props
    const [shippingList, setShippingList] = useState([])
    const [currentDelete, setCurrentDelete] = useState('')

    
    const getShippingAddress = useCallback( () => {
        const options = {
           url: 'users/shipping'
        }

        get(options).then(response =>{ 
            if (response.statusCode === 200) {
                setShippingList(response.data.records)
                setUpdateShippingList(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [setUpdateShippingList])

    useEffect(() => {
        if (updateShippingList) {
            getShippingAddress()
        }
    }, [updateShippingList, getShippingAddress])

    useEffect(() => {
        getShippingAddress()
    }, [getShippingAddress])

    const deleteShipping = (addressId) => {
        const options = {
            url: 'users/shipping/'+addressId
        }
        setCurrentDelete(addressId)
        remove(options).then((response) => {
            setShippingList(shippingList.filter(item => item._id !== addressId))
        }).catch((error) => console.log(error))
    }

    const setCurrentShipping = (address) => {
        props.addShipping(address)
    }

    const editShipping = (shippingAddress) => {
        setEditShipping(shippingAddress)
    }

    return (
        // <Paper>
            <Grid container spacing={5} > 
                {
                    shippingList.map(item => (
                        <Grid item container key={item._id.toString()}>
                            <Grid item md={8} sm={8} xs={8} >
                                <Typography variant="button" display="block" gutterBottom>
                                    {item.name} - {item.phone}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    {item.address}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    {item.city.title}, {item.state.title} - {item.pin}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small"
                                    onClick={ () => setCurrentShipping(item)}>Deliver Here</Button>

                            </Grid>
                            <Grid item md={4} sm={4} xs={4} >
                                
                                <Button 
                                    variant="contained" 
                                    color="default" 
                                    size="small"
                                    onClick={ () => editShipping(item)}>Edit</Button>

                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    size="small"
                                    disabled={currentDelete === item._id ? true : false}
                                    onClick={ () => deleteShipping(item._id)}>Delete</Button>
                                    
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        // </Paper>
    )
}

export default ListShipping