import axios from 'axios';
import { DELETE_RECIPE, DELETE_RECIPE_ERRORS } from '../actions/types';
import header from '../helper/getHeader';


export const deleteRecipeAction = (id) => {
  return {
    type: DELETE_RECIPE,
    id
  }
};

export const deleteRecipeError = (error) => {
  return {
    type: DELETE_RECIPE_ERRORS,
    error
  }
};

export const deleteRecipe = (id) => {
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
