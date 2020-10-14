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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';


import TodoList from './TodoList';
// import AddUser from './AddUser';
// import User from './user';
import Login from './containers/Login';
import ViewUser from './containers/ViewUser';
import AddUser from './containers/AddUser';
import GuardedRoute from './common/GuardedRoutes';
import LoginLink from './containers/LoginLink'
import { getLocalStorage, removeLocalStorage, clearLocalStorage } from './common/services/LocalStorage';


const Routes = (props) => {
    
    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        fillSpace: {
            flexGrow: 1
        },
        nolink: {
            textDecoration: 'none',
            color: '#FFFFFF'
        }
    }));
    
    const classes = useStyles()

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        
                    </Typography>
                    <Typography className={classes.fillSpace}></Typography>
                    <LoginLink />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader} variant="Permanent">
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key="home">
                            <Link to="/" className={ classes.links }>
                                <ListItemText inset primary="Home"/>
                            </Link>
                        </ListItem>
                        <ListItem button key="user">
                            <Link to="/user/view" className={ classes.links }>
                                <ListItemText inset primary="User"/>
                            </Link>
                        </ListItem>
                        <ListItem button key="todo">
                            <Link to="/todo"className={ classes.links }>
                                <ListItemText inset primary="Todo"/>
                            </Link>
                        </ListItem>
                    </List>
                    <Divider />
                    
                </Drawer>
                <main
                    className={clsx(classes.content, {
                    [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                   
                    <Switch>
                        <Route path="/user/add" component={AddUser} />
                        <GuardedRoute path="/user/view" component={ViewUser} />
                        <Route path="/todo" component={TodoList} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </main>
            </div>                 
      
          
        </Router>
    );

}

export default Routes;
