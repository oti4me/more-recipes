import axios from 'axios';
import { GET_RECIPE, GET_RECIPE_ERROR } from '../actions/types';
import header from '../helper/getHeader';

export const getOneRecipeAction = (recipe) => {
  return {
    type: GET_RECIPE,
    payload: recipe
  }
};

export const getOneRecipeError = (error) => {
  return {
    type: GET_RECIPE_ERROR,
    payload: error
  }
};

export const getAllRecipeAction = (recipes) => {
  return {
    type: GET_RECIPE,
    payload: recipes
  }
};

export const getAllRecipeError = (error) => {
  return {
    type: GET_RECIPE_ERROR,
    payload: error
  }
};

export const getOneRecipe = (id, callback) => {
  return dispatch => {
    dispatch(getOneRecipeError(null));
    dispatch(getOneRecipeAction({}));
    return axios.get('/api/v1/recipes/' + id, {}, header())
      .then(response => {
        const { data: { recipe } } = response;
        dispatch(getOneRecipeAction({
          recipe
        }));
        callback();
      })
      .catch(error => {
        const { response } = error;
        dispatch(getOneRecipeError({
          message: response
        }));
        callback();
      })
  }
}

export const getAllRecipes = (id, callback) => {
  return dispatch => {
    dispatch(getAllRecipeError(null));
    dispatch(getAllRecipeAction({}));
    return axios.get('/api/v1/recipes/' + id, {}, header())
      .then(response => {
        const { data: { recipe } } = response;
        dispatch(getAllRecipeAction({
          recipe
        }));
        callback();
      })
      .catch(error => {
        const { response } = error;
        dispatch(getAllRecipeError({
          message: response
        }));
        callback();
      })
  }
}

