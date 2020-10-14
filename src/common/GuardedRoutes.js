import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLocalStorage } from '../common/services/LocalStorage'

const GuardedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        getLocalStorage('loggedUser') 
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
)

export default GuardedRoute;

