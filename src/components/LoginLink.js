import React from 'react'
import Button from '@material-ui/core/button'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
// import { clearLocalStorage } from '../common/services/LocalStorage'
import { useHistory } from 'react-router-dom'

const LoginLink = props => {

    const useStyles = makeStyles(() => ({
        nolink: {
            textDecoration: 'none',
            color: '#FFFFFF'
        }

    }))

    const classes = useStyles()
    const history = useHistory()

    const { loginStatus } = props

    return (
        <Button color="inherit" className={classes.login}>
        {
            loginStatus
            ? <Link to="/logout" className={classes.nolink}>Logout</Link>
            : <Link to="/login" className={classes.nolink}>Login</Link>
        }
        
    </Button>
    )

}

export default LoginLink