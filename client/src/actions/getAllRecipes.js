import axios from 'axios';
import { GET_RECIPES, GET_RECIPES_ERRORS } from '../actions/types';
import header from '../helper/getHeader';


/**
 * @description A function to dispatch an action to get recipes
 * 
 * @param {array} recipes
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getRecipesAction = (recipes) => {
  return {
    type: GET_RECIPES,
    payload: recipes
  }
};

/**
 * @description A function to dispatch an action on recipe get recipes error
 * 
 * @param {array} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getRecipesError = (error) => {
  return {
    type: GET_RECIPES_ERRORS,
    payload: error
  }
};

/**
 * @description A function to get recipes
 * 
 * @param {number} limit
 * 
 * @return {Object} action dispatch by the action creator
 */
const getAllRecipes = (limit = 1) => {
  return dispatch => {
    dispatch(getRecipesError(null));
    dispatch(getRecipesAction({}));
    return axios.get(`/api/v1/recipes?page=${limit}`, header())
      .then(response => {
        const { data: { recipes, pagination } } = response
        dispatch(getRecipesAction({
          allRecipes: recipes,
          pagination
        }));
      })
      .catch(error => {
        const { response: { status, data } } = error;
        if (status === 404) {
          dispatch(getRecipesAction({
            allRecipes: []
          }));
        }
        dispatch(getRecipesError({
          error: { message: data }
        }));
      })
  }
};

export default getAllRecipes; 
