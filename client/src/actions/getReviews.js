import axios from 'axios';
import { GET_REVIEWS, GET_REVIEWS_ERROR } from '../actions/types';
import header from '../helper/getHeader';

export const getReviewsAction = (reviews) => {
  return {
    type: GET_REVIEWS,
    payload: reviews
  }
};

export const getReviewsError = (error) => {
  return {
    type: GET_REVIEWS_ERROR,
    payload: error
  }
};

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
        const { response } = error;
        dispatch(getReviewsError({
          message: response
        }));
      })
  }
};

