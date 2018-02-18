import axios from 'axios';
import { GET_REVIEWS, GET_REVIEWS_ERROR } from '../actions/types';
import header from '../helper/getHeader';

/**
 * @description A function to dispatch an action on get review success
 * 
 * @param {array} reviews
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getReviewsAction = (reviews) => {
  return {
    type: GET_REVIEWS,
    payload: reviews
  }
};

/**
 * @description A function to dispatch an action on get review error
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getReviewsError = (error) => {
  return {
    type: GET_REVIEWS_ERROR,
    payload: error
  }
};

/**
 * @description A function to get reviews
 * 
 * @param {number} id
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getReviews = (id) => {
  return dispatch => {
    dispatch(getReviewsError(null));
    dispatch(getReviewsAction({}));
    return axios.get(`/api/v1/recipes/${id}/reviews`, header())
      .then(res => {
        if (res) {
          const { data: { reviews } } = res;
          dispatch(getReviewsAction({
            reviews
          }));
        }
      })
      .catch(error => {
        const { response: { data, status } } = error;
        if (status === 404) {
          dispatch(getReviewsAction({
            reviews: []
          }));
        }
        dispatch(getReviewsError({
          message: data
        }));
      })
  }
};

export default getReviews;
