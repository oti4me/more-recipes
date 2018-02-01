import axios from 'axios';
import { ADD_REVIEW, ADD_REVIEW_ERRORS } from '../actions/types';
import header from '../helper/getHeader';


export const addReviewAction = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review
  }
};

export const addReviewError = (error) => {
  return {
    type: ADD_REVIEW_ERRORS,
    payload: error
  }
};

export const addReview = (review, callback) => {
  const { id, comment } = review;
  return dispatch => {
    dispatch(addReviewError(null));
    dispatch(addReviewAction({}));
    return axios.post(`/api/v1/recipes/${id}/reviews`,
      { comment }, header())
      .then(res => {
        if (res) {
          callback(true);
        }

      })
      .catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(addReviewError({
          errors: {
            status,
            message
          }
        }));
        callback(false);
      })
  }
};
