import axios from 'axios';
import {
  GET_UPVOTED_RECIPES,
  GET_UPVOTED_RECIPES_ERRORS
} from '../actions/types';
import header from '../helper/getHeader';

/**
 * @description A function to dispatch an action on get most favourited recipes success
 * 
 * @param {array} recipes
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getUpvotedAction = (recipes) => {
  return {
    type: GET_UPVOTED_RECIPES,
    payload: recipes
  }
};

/**
 * @description A function to dispatch an action on feching of most favourited recipes
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getUpvotedError = (error) => {
  return {
    type: GET_UPVOTED_RECIPES_ERRORS,
    payload: error
  }
};

/**
 * @description A function to get most favourited recipes
 * 
 * @param {number} limit
 * 
 * @return {Object} action dispatch by the action creator
 */
const getMostUpvotedRecipes = (limit = 1) => {
  return dispatch => {
    dispatch(getUpvotedError(null));
    dispatch(getUpvotedAction({}));
    return axios.get(`/api/v1/recipes?sort=upvotes&order=desc&page=${limit}`, header())
      .then(response => {
        const { data: { recipes, pagination } } = response
        dispatch(getUpvotedAction({
          upvotedRecipes: recipes,
          pagination
        }));
        return res;
      })
      .catch(error => {
        const { response } = error;
        dispatch(getUpvotedError({
          error: { message: response }
        }));
      })
  }
};

export default getMostUpvotedRecipes;
