import axios from 'axios';
import { GET_RECIPE, GET_RECIPE_ERROR } from '../actions/types';
import header from '../helper/getHeader';

/**
 * @description A function to dispatch an action on get single recipe success
 * 
 * @param {object} recipe
 * 
 * @return {Object} action dispatch by the action creator
 */
export const recipeDetailAction = (recipe) => {
  return {
    type: GET_RECIPE,
    payload: recipe
  }
};

/**
 * @description A function to dispatch an action on get asingle recipe failure
 * 
 * @param {array} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getRecipeError = (error) => {
  return {
    type: GET_RECIPE_ERROR,
    payload: error
  }
};

/**
 * @description A function to get a single recipe
 * 
 * @param {number} id
 * @param {object} history
 * 
 * @return {Object} action dispatch by the action creator
 */
export const recipeDetails = (id, history) => {
  return dispatch => {

    dispatch(getRecipeError(null));
    dispatch(recipeDetailAction({}));

    return axios.get(`/api/v1/recipes/${id}`, header())
      .then(response => {
        const { data: { recipe } } = response;
        dispatch(recipeDetailAction({ recipe }))
      })
      .catch(error => {
        if (error.response.status === 404) {
          history.push('/not-found');
        }
        const { response } = error;
        dispatch(getRecipeError({
          message: response
        }));
      })
  }
};

export default recipeDetails;
