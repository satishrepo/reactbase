import React, { useState, useEffect } from 'react';
import { 
    BrowserRouter as Router,
    Link,
    Switch,
    Route, 
    // useRouteMatch,
    // useHistory
} from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';


import TodoList from './TodoList';
import Login from './containers/Login';
import ViewUser from './containers/ViewUser';
import AddUser from './containers/AddUser';
import GuardedRoute from './common/GuardedRoutes';
import LoginLink from './containers/LoginLink'
import Logout from './containers/Logout'
import AddProduct from './containers/AddProduct'
import ProductList from './containers/ProductList'
import Cart from './components/cart'
import Order from './components/checkout/Order'

import Player from './components/player'

const Routes = (props) => {
    

    return (
        <Router>
            
    
            <Switch>
                <Route path="/user/add" component={AddUser} />
                <GuardedRoute path="/user/view" component={ViewUser} />
                <Route path="/todo" component={TodoList} />
                <Route path="/login" component={Login} />
                <Route path="/product/add" component={AddProduct} />
                <Route path="/products" component={ProductList} />
                <Route path="/cart" component={Cart} />
                {/* <Route path="/shipping" component={Shipping} /> */}
                <Route path="/order" component={Order} />
                <Route path="/player" component={Player} />
            </Switch>
            <Route path="/logout" component={Logout} />
               
          
        </Router>
    );

}

export default Routes;
