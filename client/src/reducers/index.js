import { combineReducers } from 'redux';

import auth from './userReducer';
import recipes from './recipeReducer';

export default combineReducers({
  auth, recipes
});