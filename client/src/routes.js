import React from 'react';
import {Route, Switch, Redirect, Link } from 'react-router-dom';

import Home from './components/home/HomePage.jsx';
import SigninPage from './components/signin/SigninPage.jsx';
import SignupPage from './components/signup/SignupPage.jsx';
import AddRecipe from './components/addRecipe/AddRecipePage.jsx';
import UserProfilePage from './components/users/UserProfilePage.jsx';
import AuthComponent from './helper/AuthComponent.jsx';


export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/home" component={Home}/>
    <Route path="/signin" component={SigninPage}/>
    <Route path="/signup" component={SignupPage}/>
    <Route path="/addrecipe" component={AuthComponent(AddRecipe)}/>
    <Route path="/profile" component={AuthComponent(UserProfilePage)}/>
    <Redirect to="/" />
  </Switch>
);