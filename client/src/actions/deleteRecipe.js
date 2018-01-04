import axios from 'axios';
import { DELETE_RECIPE, DELETE_RECIPE_ERRORS } from '../actions/types';
import header from '../helper/getHeader';


export const deleteRecipeAction = (data) => {
  return {
    type: DELETE_RECIPE,
    payload: data
  }
};

export const deleteRecipeError = (data) => {
  return {
    type: DELETE_RECIPE_ERRORS,
    payload: data
  }
};

export const deleteRecipe = (id, callback) => {
  return dispatch => {
    dispatch(deleteRecipeError(null));
    dispatch(deleteRecipeAction({}));
    return axios.delete(`/api/v1/recipes/${id}`, header())
      .then(res => {
        if (res) {
          return res.data;
        }
      })
      .catch(error => {
        dispatch(deleteRecipeError({
          errors: {
            status: error.response.status,
            message: error.response.data.message
          }
        }));
        callback(false);
      })
  }
}

