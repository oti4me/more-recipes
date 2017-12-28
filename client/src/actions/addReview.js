import axios from 'axios';
import { ADD_REVIEW, ADD_REVIEW_ERRORS } from '../actions/types';
import header from '../helper/getHeader';


export const addReviewAction = (data) => {
  return {
    type: ADD_REVIEW,
    payload: data
  }
};

export const addReviewError = (data) => {
  return {
    type: ADD_REVIEW_ERRORS,
    payload: data
  }
};

export const addReview = (data, callback) => {
  return dispatch => {
    dispatch(addReviewError(null));
    dispatch(addReviewAction({}));
    return axios.post(`/api/v1/recipes/${data.id}/reviews`, { comment: data.comment }, header())
      .then(res => {
        if (res) {
          callback(true);
        }

      })
      .catch(error => {
        dispatch(addReviewError({
          errors: {
            status: error.response.status,
            message: error.response.data.message
          }
        }));
        callback(false);
      })
  }
}

