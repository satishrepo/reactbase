import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { setLocalStorage } from '../common/services/LocalStorage';
import { Paper, Grid, TextField, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Face, Fingerprint } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';
import SnackBar from './SnackBar'


const Login = props => {

    console.log('IN LOGIN', props)

    const initUser = {
        email: '',
        password: ''
    }

    const { loginStatus, loginResponse, loginError, loginInProgress } = props
    const [userData, setUserData] = useState(initUser)
    const [formValidationErrors, setFormValidationErrors] = useState({})

    useEffect(() => {
        if (loginStatus) {
            setLocalStorage('loggedUser', { email: loginResponse.user.email, name: loginResponse.user.name })
            setLocalStorage('authToken', { token: loginResponse.token })
            props.loadCategory()
            history.push('/user/view')
        }
    }, [loginInProgress])


    const handleOnChange = (e, name) => {
        const { target } = e
        setUserData({...userData, [name]: target.value})
    }

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
    const history = useHistory()

    const showError = (errorType) => {
        switch(errorType) {
            case 1: 
                // return <Alert severity="error">Invalid login credentials</Alert>
                return <SnackBar show={true} message="Invalid Login Credentials" type="error"></SnackBar>
            case 2:
                return <Alert severity="warning">Something went wrong</Alert>
            default:
                return ''
        }
    }

    const validateForm = () => {
        let error = false
        if (!userData.email) {
            setFormValidationErrors((formValidationErrors) => ({...formValidationErrors, email: 'Email is required'}))
            error = true
        } else {
            delete formValidationErrors.email
        }
        if (!userData.password) {
            setFormValidationErrors((formValidationErrors) => ({...formValidationErrors, password: 'Password is required'}))
            error = true
        } else {
            delete formValidationErrors.password
        }
        return error 
    }

    const handleRedirected = () => {
        history.push('/user/add')
    }

    const submitLogin = () => {
        
        const invalid = validateForm()
        
        if (invalid) {
            return false
        }
        
        props.login(userData)
    }
  
    
    return (
        <Container maxWidth="sm">

            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <Grid container spacing={2} >
                        <Typography display="inline" align="center" variant="h6" className={classes.typography}>Login</Typography>
                    </Grid>

                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                                id="email" 
                                label="Email"
                                name="email" 
                                type="email" 
                                onChange={(e) => handleOnChange(e, 'email')}
                                helperText={formValidationErrors['email']}
                                fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                                id="password" 
                                label="Password" 
                                type="password" 
                                onChange={(e) => handleOnChange(e, 'password')}
                                helperText={formValidationErrors['password']}
                                fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Button 
                                disableFocusRipple 
                                disableRipple 
                                style={{ textTransform: "none" }} 
                                variant="text" 
                                color="primary"
                                onClick={handleRedirected}
                                >Register</Button>
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple 
                                disableRipple 
                                style={{ textTransform: "none" }} 
                                variant="text" 
                                color="primary"
                                >Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            style={{ textTransform: "none" }}
                            onClick={submitLogin}
                            disabled={loginInProgress}
                            >Login</Button>
                    </Grid>
                    { showError(loginError) }
                </div>
            </Paper>
        </Container>
    );
    
}
export default Login
