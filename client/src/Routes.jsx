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
import auth from './helper/auth';
import notAuth from './helper/notAuth';


const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/signin" component={notAuth(SigninPage)} />
      <Route path="/signup" component={notAuth(SignupPage)} />
      <Route path="/addrecipe" component={auth(AddRecipePage)} />
      <Route
        path="/updaterecipe/:id"
        component={auth(UpdateRecipePage)}
      />
      <Route path="/profile" component={auth(UserProfilePage)} />
      <Route path="/myrecipes" component={auth(MyRecipesPage)} />
      <Route path="/recipe/:id" component={auth(RecipeDetailPage)} />
      <Route path="/favourites" component={auth(FavouritesPage)} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default Routes
