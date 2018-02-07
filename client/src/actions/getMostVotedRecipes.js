import axios from 'axios';
import {
  GET_UPVOTED_RECIPES,
  GET_UPVOTED_RECIPES_ERRORS
} from '../actions/types';
import header from '../helper/getHeader';

export const getUpvotedAction = (recipes) => {
  return {
    type: GET_UPVOTED_RECIPES,
    payload: recipes
  }
};

export const getUpvotedError = (error) => {
  return {
    type: GET_UPVOTED_RECIPES_ERRORS,
    payload: error
  }
};

export const getUpvotedRecipes = (limit = 1) => {
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
