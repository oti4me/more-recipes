import axios from 'axios';
import { UPVOTE_RECIPE, UPVOTE_RECIPE_ERRORS, DOWNVOTE_RECIPE_ERRORS, DOWNVOTE_RECIPE } from '../actions/types';
import header from '../helper/getHeader';

export const upvoteRecipeError = (error) => {
  return {
    type: UPVOTE_RECIPE_ERRORS,
    payload: error
  }
};

export const upvoteRecipeAction = (recipe) => {
  return {
    type: UPVOTE_RECIPE,
    payload: recipe
  }
};

export const downvoteRecipeError = (error) => {
  return {
    type: DOWNVOTE_RECIPE_ERRORS,
    payload: error
  }
};

export const downvoteRecipeAction = (recipe) => {
  return {
    type: DOWNVOTE_RECIPE,
    payload: recipe
  }
};

export const upvoteRecipe = (id) => {
  return dispatch => {
    dispatch(upvoteRecipeError(null));
    dispatch(upvoteRecipeAction({}));
    return axios.post(`/api/v1/recipes/${id}/upvotes`, {}, header())
      .then(response => {
        if (response) {
          const { data: { message, recipe } } = response
          dispatch(upvoteRecipeAction({
            message,
            recipe
          }));
        }
      })
      .catch(error => {
        const { response: { status, data: { message } } } = error
        dispatch(upvoteRecipeError({
          errors: {
            status,
            message
          }
        }));
      })
  }
};

export const downVoteRecipe = (id) => {
  return dispatch => {
    dispatch(downvoteRecipeError(null));
    dispatch(downvoteRecipeAction({}));
    return axios.post(`/api/v1/recipes/${id}/downvotes`, {
      voteType: 'downvotes'
    }, header())
      .then(response => {
        if (response) {
          const { data: { message, recipe } } = response;
          dispatch(downvoteRecipeAction({
            message,
            recipe
          }));
        }
      })
      .catch(error => {
        const { response } = error;
        dispatch(downvoteRecipeError({
          errors: {
            response
          }
        }));
      })
  }
};
