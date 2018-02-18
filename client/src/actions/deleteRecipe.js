import axios from 'axios';
import { DELETE_RECIPE, DELETE_RECIPE_ERRORS } from '../actions/types';
import header from '../helper/getHeader';


/**
 * @description A function to dispatch an action to delete a recipe
 * 
 * @param {number} id
 * 
 * @return {Object} action dispatch by the action creator
 */
export const deleteRecipeAction = (id) => {
  return {
    type: DELETE_RECIPE,
    id
  }
};


/**
 * @description A function to dispatch an action to add delete error
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const deleteRecipeError = (error) => {
  return {
    type: DELETE_RECIPE_ERRORS,
    error
  }
};


/**
 * @description A function to dispatch an action to add review action
 * 
 * @param {number} id
 * 
 * @return {Object} promise object
 */
const deleteRecipe = (id) => {
  return dispatch => {
    dispatch(deleteRecipeError(null));
    dispatch(deleteRecipeAction({}));
    return axios.delete(`/api/v1/recipes/${id}`, header())
      .then(res => {
        if (res) {
          dispatch(deleteRecipeAction(id));
        }
      })
      .catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(deleteRecipeError({
          errors: {
            status: status,
            message
          }
        }));
      })
  }
};

export default deleteRecipe
