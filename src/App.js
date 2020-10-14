import React, { Fragment } from 'react';
import './App.css';
import Routes from './Routes'

const App = (props) => {
  return (
    <Fragment> 
      <Routes {...props}/>
    </Fragment>
  );
}

export default App;
