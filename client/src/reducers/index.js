import { combineReducers } from 'redux';

import auth from './reducer_user.js';
import recipes from './reducer_recipe.js';

export default combineReducers({
  auth, recipes
});