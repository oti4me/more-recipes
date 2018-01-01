import axios from 'axios';
import { UPVOTE_RECIPE, UPVOTE_RECIPE_ERRORS, DOWNVOTE_RECIPE_ERRORS, DOWNVOTE_RECIPE } from '../actions/types';
import header from '../helper/getHeader';

export const upvoteRecipeError = (data) => {
  return {
    type: UPVOTE_RECIPE_ERRORS,
    payload: data
  }
};

export const upvoteRecipeAction = (data) => {
  return {
    type: UPVOTE_RECIPE,
    payload: data
  }
};

export const downvoteRecipeError = (data) => {
  return {
    type: DOWNVOTE_RECIPE_ERRORS,
    payload: data
  }
};

export const downvoteRecipeAction = (data) => {
  return {
    type: DOWNVOTE_RECIPE,
    payload: data
  }
};

export const upvoteRecipe = (id, callback) => {
  return dispatch => {
    dispatch(upvoteRecipeError(null));
    dispatch(upvoteRecipeAction({}));
    return axios.post('/api/v1/recipes/' + id + '/votes', { voteType: 'upvotes' }, header())
      .then(res => {
        if (res) {
          dispatch(upvoteRecipeAction({
            upVotes: { message: res.data.message }
          }));
          callback(true);
        }
      })
      .catch(error => {
        dispatch(upvoteRecipeError({
          errors: {
            status: error.response.status,
            message: error.response.data.message
          }
        }));
        callback(false);
      })
  }
}

export const downVoteRecipe = (id, callback) => {
  return dispatch => {
    dispatch(downvoteRecipeError(null));
    dispatch(downvoteRecipeAction({}));
    return axios.post('/api/v1/recipes/' + id + '/votes', { voteType: 'downvotes' }, header())
      .then(res => {
        if (res) {
          dispatch(downvoteRecipeAction({
            downVotes: { message: res.data.message }
          }));
          callback(true);
        }
      })
      .catch(error => {
        dispatch(downvoteRecipeError({
          errors: {
            status: error.response.status,
            message: error.response.data.message
          }
        }));
        callback(false);
      })
  }
}

