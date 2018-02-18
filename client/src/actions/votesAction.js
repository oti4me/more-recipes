import axios from 'axios';
import { UPVOTE_RECIPE, UPVOTE_RECIPE_ERRORS, DOWNVOTE_RECIPE_ERRORS, DOWNVOTE_RECIPE } from '../actions/types';
import header from '../helper/getHeader';

/**
 * @description A function to dispatch an action on upvote recipe error
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const upvoteRecipeError = (error) => {
  return {
    type: UPVOTE_RECIPE_ERRORS,
    payload: error
  }
};

/**
 * @description A function to dispatch an action on upvote recipe success
 * 
 * @param {object} recipe
 * 
 * @return {Object} action dispatch by the action creator
 */
export const upvoteRecipeAction = (recipe) => {
  return {
    type: UPVOTE_RECIPE,
    payload: recipe
  }
};

/**
 * @description A function to dispatch an action on downvote recipe error
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const downvoteRecipeError = (error) => {
  return {
    type: DOWNVOTE_RECIPE_ERRORS,
    payload: error
  }
};

/**
 * @description A function to dispatch an action on downvote recipe success
 * 
 * @param {object} recipe
 * 
 * @return {Object} action dispatch by the action creator
 */
export const downvoteRecipeAction = (recipe) => {
  return {
    type: DOWNVOTE_RECIPE,
    payload: recipe
  }
};

/**
 * @description A function to upvote a recipe
 * 
 * @param {number} id
 * 
 * @return {Object} request promise object
 */
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

/**
 * @description A function to downvote a recipe
 * 
 * @param {number} id
 * 
 * @return {Object} request promise object
 */
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
