import React, { Fragment } from 'react';
import './App.css';
import './player.css';
// import Routes from './Routes'
import Routes from './Routes-temp'

const App = (props) => {
  return (
    <Fragment> 
      <Routes {...props}/>
    </Fragment>
  );
}

export default App;
