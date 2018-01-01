import axios from 'axios';
import { GET_RECIPE, GET_RECIPE_ERROR } from '../actions/types';
import header from '../helper/getHeader';

export const getOneRecipeAction = (data) => {
  return {
    type: GET_RECIPE,
    payload: data
  }
};

export const getOneRecipeError = (data) => {
  return {
    type: GET_RECIPE_ERROR,
    payload: data
  }
};

export const getAllRecipeAction = (data) => {
  return {
    type: GET_RECIPE,
    payload: data
  }
};

export const getAllRecipeError = (data) => {
  return {
    type: GET_RECIPE_ERROR,
    payload: data
  }
};

export const getOneRecipe = (id, callback) => {
  return dispatch => {
    dispatch(getOneRecipeError(null));
    dispatch(getOneRecipeAction({}));
    return axios.get('/api/v1/recipes/' + id, {}, header())
      .then(res => {
        dispatch(getOneRecipeAction({ recipe: res.data.recipe }));
        callback();
      })
      .catch(error => {
        dispatch(getOneRecipeError({ message: error.response }));
        callback();
      })
  }
}

export const getAllRecipes = (id, callback) => {
  return dispatch => {
    dispatch(getAllRecipeError(null));
    dispatch(getAllRecipeAction({}));
    return axios.get('/api/v1/recipes/' + id, {}, header())
      .then(res => {
        dispatch(getAllRecipeAction({ recipe: res.data.recipe }));
        callback();
      })
      .catch(error => {
        dispatch(getAllRecipeError({ message: error.response }));
        callback();
      })
  }
}

