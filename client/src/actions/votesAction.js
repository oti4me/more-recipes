import axios from 'axios';
import { UPVOTE_RECIPE, UPVOTE_RECIPE_ERRORS } from '../actions/types';
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

