import axios from 'axios';
import { ADD_REVIEW, ADD_REVIEW_ERRORS } from '../actions/types';
import header from '../helper/getHeader';


/**
 * @description A function to dispatch an action to add review action
 * 
 * @param {array} review
 * 
 * @return {Object} action dispatch by the action creator
 */
export const addReviewAction = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review
  }
};

/**
 * @description A function to dispatch an action to add review error action
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const addReviewError = (error) => {
  return {
    type: ADD_REVIEW_ERRORS,
    payload: error
  }
};

/**
 * @description A function to add review
 * 
 * @param {object} details
 * @param {object} Materialize
 * 
 * @return {Object} promise object
 */
const addReview = (details, Materialize) => {
  const { id, comment } = details;
  return dispatch => {
    return axios.post(`/api/v1/recipes/${id}/reviews`,
      { comment }, header())
      .then(response => {
        if (response) {
          const { data: { review } } = response;
          dispatch(addReviewAction({
            review
          }))
          Materialize.toast('Your review has been recieved', 3000, 'green');
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
        if (status === 400) {
          message.map(err => {
            Materialize.toast(err.msg, 4000, 'red');
          });
        } else if (status === 409) {
          Materialize.toast(message, 4000, 'red');
        } else {
          Materialize.toast(error.response.data, 4000);
        }
      })
  }
};

export default addReview 
