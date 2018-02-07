import axios from 'axios';
import {
  GET_FAVOURITED_RECIPES,
  GET_FAVOURITED_RECIPES_ERRORS
} from '../actions/types';
import header from '../helper/getHeader';

export const getFavouritedAction = (recipes) => {
  return {
    type: GET_FAVOURITED_RECIPES,
    payload: recipes
  }
};

export const getFavouritedError = (error) => {
  return {
    type: GET_FAVOURITED_RECIPES_ERRORS,
    payload: error
  }
};

export const getFavouritedRecipes = () => {
  return dispatch => {
    return axios.get(`/api/v1/recipes/toprecipes`, header())
      .then(response => {
        const { data: { recipes } } = response
        dispatch(getFavouritedAction({
          favouritedRecipes: recipes,
        }));
        return res;
      })
      .catch(error => {
        const { response } = error;
        dispatch(getFavouritedError({
          error: { message: response }
        }));
      })
  }
};
