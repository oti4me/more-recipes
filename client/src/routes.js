import React from 'react';
import {Route, Switch, Redirect, Link } from 'react-router-dom';

// import App from './components/App.jsx';
import Home from './components/home/HomePage.jsx';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/" />
  </Switch>
);