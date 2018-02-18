import axios from 'axios';
import {
  GET_FAVOURITED_RECIPES,
  GET_FAVOURITED_RECIPES_ERRORS
} from '../actions/types';
import header from '../helper/getHeader';

/**
 * @description A function to dispatch an action on get most favourited recipes success
 * 
 * @param {array} recipes
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getFavouritedAction = (recipes) => {
  return {
    type: GET_FAVOURITED_RECIPES,
    payload: recipes
  }
};

/**
 * @description A function to dispatch an action on get most favourited recipes success
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getFavouritedError = (error) => {
  return {
    type: GET_FAVOURITED_RECIPES_ERRORS,
    payload: error
  }
};

/**
 * @description A function to dispatch an action to get recipes
 * 
 * @return {Object} request promise object
 */
export const getMostFavouritedRecipes = () => {
  return dispatch => {
    return axios.get(`/api/v1/recipes/toprecipes`, header())
      .then(response => {
        const { data: { recipes } } = response
        dispatch(getFavouritedAction({
          favouritedRecipes: recipes,
        }));
        return res;
      })
      .catch(error => {
        const { response } = error;
        dispatch(getFavouritedError({
          error: { message: response }
        }));
      })
  }
};

export default getMostFavouritedRecipes;
