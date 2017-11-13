import { combineReducers } from 'redux';

import auth from './reducer_users.js';
import recipes from './reducer_recipes.js';

export default combineReducers({
  auth, recipes
});