import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/home/HomePage';
import SigninPage from './components/signin/SigninPage';
import SignupPage from './components/signup/SignupPage';
import AddRecipePage from './components/addRecipe/AddRecipePage';
import UpdateRecipePage from './components/updateRecipe/UpdateRecipePage';
import UserProfilePage from './components/users/UserProfilePage';
import MyRecipesPage from './components/myRecipes/MyRecipesPage';
import FavouritesPage from './components/favourites/FavouritePage';
import RecipeDetailPage from './components/recipeDetail/RecipeDetailPage';
import NotFound from './components/NotFound';
import AuthComponent from './helper/AuthComponent';
import NotAuth from './helper/NotAuthComponent';


const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/signin" component={NotAuth(SigninPage)} />
      <Route path="/signup" component={NotAuth(SignupPage)} />
      <Route path="/addrecipe" component={AuthComponent(AddRecipePage)} />
      <Route
        path="/updaterecipe/:id"
        component={AuthComponent(UpdateRecipePage)}
      />
      <Route path="/profile" component={AuthComponent(UserProfilePage)} />
      <Route path="/myrecipes" component={AuthComponent(MyRecipesPage)} />
      <Route path="/recipe/:id" component={AuthComponent(RecipeDetailPage)} />
      <Route path="/favourites" component={AuthComponent(FavouritesPage)} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default Routes
