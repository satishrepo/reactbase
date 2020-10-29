import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { clearLocalStorage } from '../common/services/LocalStorage'


const Logout = (props) => {

    const history = useHistory()

    useEffect(() => {
        props.logout()
        clearLocalStorage()
        history.push('/login')
    })

    return (
        <Link to="/logout"></Link>
    )
    
}

export default Logout