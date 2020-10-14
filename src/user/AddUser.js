import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { setLocalStorage } from '../common/services/LocalStorage'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import { Paper, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const AddUser = props => {
  
  const initUserInfo = {
    name: '',
    email: '',
    password: '',
  }
  const initUserError = {
    nameError: '',
    emailError: '',
    passwordError: '',
  }
  const history = useHistory()

  const { addUserStatus, addUserError, addUserFailed, addUserResponse } = props;

  const [userInfo, setUserInfo] = useState({...initUserInfo,...initUserError})
  const [isFormDisabled, setIsDisabled] = useState(false)

  const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  useEffect( () => {
    checkFormStatus(addUserStatus);
  }, [addUserStatus])

  const checkFormStatus = (status) => {
    if (status === 'init') {
      setIsDisabled(true)
    } else if(status === 'failed') {
      setIsDisabled(false)
    } else if(status === 'success') {
      console.log('status', status)
      clearForm()
      setIsDisabled(false)
      const loggedUserData = {
        email: addUserResponse.email,
        name: addUserResponse.name
      }
      setLocalStorage('loggedUser', loggedUserData)
      history.push('/user/view')
    } else {
      setIsDisabled(false)
    }
  }

  const handleOnChange = (e, name) => {
    const { target } = e;
    setUserInfo({...userInfo, [name] : target.value })
  }

  const validateForm = () => {
    let error = false;
    if (userInfo.name === '') {
      userInfo['nameError'] = 'Name is required';
      // setUserInfo(userInfo);
      error = true;
    } else {
      userInfo['nameError'] = undefined;
      // setUserInfo(userInfo);
    }
    
    if (userInfo.email === '') {
      userInfo['emailError'] = 'Email is required';
      error = true;
    } else if (!userInfo.email.includes('@')) {
      userInfo['emailError'] = 'Email is invalid'
      error = true;
    } else {
      userInfo['emailError'] = undefined;
    }
    if (userInfo.password === '') {
      userInfo['passwordError'] = 'Password is required'
      error = true;
    } else {
      userInfo['passwordError'] = undefined;
    }
    setUserInfo({...userInfo});
    if (error) {
      return false;
    }
    setUserInfo({...userInfo,...initUserError})
    return true;
    
  }

  const clearForm = () => {
    setUserInfo({...initUserInfo})
  }

  const registerUser = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      props.addUser(userInfo);
    }
  }

  return (
    <Fragment>
       <Container maxWidth="sm">
         <Paper className={classes.padding}>
          <div className={classes.margin}>

          <Grid container spacing={2} >
              <Typography display="inline" align="center" variant="h6" className={classes.typography}>Register</Typography>
          </Grid>

            <Grid container spacing={2} alignItems="flex-end">

              <Grid item sm={true} md={true} xs={true}>
                <TextField 
                  label="Name" 
                  name="name" 
                  onChange={(e) => handleOnChange(e, 'name')}
                  value={userInfo.name} 
                  helperText={userInfo.nameError}
                  fullWidth autoFocus required
                />
              </Grid>
              
            </Grid>

            <Grid container spacing={2} alignItems="flex-end">

              <Grid item sm={true} md={true} xs={true}>
              <TextField 
                label="Email" 
                name="email" 
                onChange={(e) => handleOnChange(e, 'email')} 
                value={userInfo.email}
                helperText={userInfo.emailError}
                fullWidth autoFocus required
              />
              </Grid>
              
            </Grid>

            <Grid container spacing={2} alignItems="flex-end">

              <Grid item sm={true} md={true} xs={true}>
                <TextField 
                  label="Password" 
                  name="password" 
                  type="password"
                  onChange={(e) => handleOnChange(e, 'password')}
                  value={userInfo.password} 
                  helperText={userInfo.passwordError}
                  fullWidth autoFocus required
                />
              </Grid>
              
            </Grid>

            <Grid container justify="center" style={{ marginTop: '10px' }}>
                <Button 
                  color="primary"
                  variant="contained"
                  onClick={(e) => registerUser(e)} 
                  disabled={isFormDisabled}
                  >Save</Button>
              
            </Grid>
          </div>

         </Paper>
          
       </Container>
    </Fragment>
  )
}

export default AddUser;