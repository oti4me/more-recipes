import axios from 'axios';
import { GET_RECIPE, GET_RECIPE_ERROR } from '../actions/types';
import header from '../helper/getHeader';

export const recipeDetail = (recipe) => {
  return {
    type: GET_RECIPE,
    payload: recipe
  }
};

export const getRecipeError = (error) => {
  return {
    type: GET_RECIPE_ERROR,
    payload: error
  }
};

export const getRecipe = (id, history) => {
  return dispatch => {

    dispatch(getRecipeError(null));
    dispatch(recipeDetail({}));

    return axios.get(`/api/v1/recipes/${id}`, header())
      .then(response => {
        const { data: { recipe } } = response;
        dispatch(recipeDetail({ recipe }))
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

