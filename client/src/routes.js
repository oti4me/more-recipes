import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import Home from './components/home/HomePage.jsx';
import SigninPage from './components/signin/SigninPage.jsx';
import SignupPage from './components/signup/SignupPage.jsx';
import AddRecipePage from './components/addRecipe/AddRecipePage.jsx';
import UpdateRecipePage from './components/updateRecipe/UpdateRecipePage.jsx';
import UserProfilePage from './components/users/UserProfilePage.jsx';
import MyRecipesPage from './components/myRecipes/MyRecipesPage.jsx';
import RecipeDetailPage from './components/recipeDetail/RecipeDetailPage.jsx';
import AuthComponent, { notAuth } from './helper/AuthComponent.jsx';


export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/signin" component={notAuth(SigninPage)} />
    <Route path="/signup" component={notAuth(SignupPage)} />
    <Route path="/addrecipe" component={AuthComponent(AddRecipePage)} />
    <Route path="/updaterecipe" component={AuthComponent(UpdateRecipePage)} />
    <Route path="/profile" component={AuthComponent(UserProfilePage)} />
    <Route path="/myrecipes" component={AuthComponent(MyRecipesPage)} />
    <Route path="/recipe/:id" component={AuthComponent(RecipeDetailPage)} />
    <Redirect to="/" />
  </Switch>
);