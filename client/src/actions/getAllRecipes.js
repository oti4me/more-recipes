import axios from 'axios';
import { GET_RECIPES, GET_RECIPES_ERRORS } from '../actions/types';
import header from '../helper/getHeader';

export const getRecipesAction = (recipes) => {
  return {
    type: GET_RECIPES,
    payload: recipes
  }
};

export const getRecipesError = (error) => {
  return {
    type: GET_RECIPES_ERRORS,
    payload: error
  }
};

export const getRecipes = (limit = 1) => {
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
        return res;
      })
      .catch(error => {
        const { response } = error;
        dispatch(getRecipesError({
          error: { message: response }
        }));
      })
  }
};
