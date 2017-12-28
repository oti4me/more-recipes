import axios from 'axios';
import { GET_REVIEWS, GET_REVIEWS_ERROR } from '../actions/types';
import header from '../helper/getHeader';

export const getReviewsAction = (data) => {
  return {
    type: GET_REVIEWS,
    payload: data
  }
};

export const getReviewsError = (data) => {
  return {
    type: GET_REVIEWS_ERROR,
    payload: data
  }
};
export const getReviews = (id, callback) => {
  return dispatch => {
    dispatch(getReviewsError(null));
    dispatch(getReviewsAction({}));
    return axios.get(`/api/v1/recipes/${id}/reviews`, { id }, header())
      .then(res => {
        if (res) {
          dispatch(getReviewsAction({ reviews: res.data.reviews }));
          callback(true);
        }
      })
      .catch(error => {
        dispatch(getReviewsError({ message: error.response }));
        callback(false);
      })
  }
}

