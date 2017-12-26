import axios from 'axios';
import { GET_RECIPE, GET_RECIPE_ERROR } from '../actions/types';
import header from '../helper/getHeader';


export const recipeDetail = (data) => {
  return {
    type: GET_RECIPE,
    payload: data
  }
};

export const getRecipeError = (data) => {
  return {
    type: GET_RECIPE_ERROR,
    payload: data
  }
};

export const getRecipe = (id, callback) => {
  return dispatch => {
    dispatch(getRecipeError(null));
    dispatch(recipeDetail({}));

    return axios.get('/api/v1/recipes/' + id, {}, header)
      .then(res => {
        dispatch(recipeDetail({ recipe: res.data.recipe }));
        callback();
      })
      .catch(error => {
        dispatch(getRecipeError({ message: error.response }));
        callback();
      })
  }
}

