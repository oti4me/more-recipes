import axios from 'axios';
import { ADD_FAVOURITE, ADD_FAVOURITE_ERRORS, REMOVE_FAVOURITE, REMOVE_FAVOURITE_ERRORS } from '../actions/types';
import header from '../helper/getHeader';

export const addFavouriteAction = (data) => {
  return {
    type: ADD_FAVOURITE,
    payload: data
  }
};

export const addFavouriteError = (data) => {
  return {
    type: ADD_FAVOURITE_ERRORS,
    payload: data
  }
};

export const getFavouriteAction = (data) => {
  return {
    type: ADD_FAVOURITE,
    payload: data
  }
};

export const getFavouriteError = (data) => {
  return {
    type: ADD_FAVOURITE_ERRORS,
    payload: data
  }
};

export const removeFavouriteAction = (data) => {
  return {
    type: REMOVE_FAVOURITE,
    payload: data
  }
};

export const removeFavouriteError = (data) => {
  return {
    type: REMOVE_FAVOURITE_ERRORS,
    payload: data
  }
};

export const addFavourite = (data, callback) => {
  return dispatch => {
    dispatch(addFavouriteError(null));
    dispatch(addFavouriteAction({}));
    return axios.post('/api/v1/users/' + data.userId + '/favourites', { recipeId: data.recipeId }, header())
      .then(res => {
        if (res) {
          callback(true);
        }
      })
      .catch(error => {
        dispatch(addFavouriteError({
          errors: {
            status: error.response.status,
            message: error.response.data.message
          }
        }));
        callback(false);
      })
  }
}

export const getFavourites = (userId, callback) => {
  return dispatch => {
    dispatch(getFavouriteError(null));
    dispatch(getFavouriteAction({}));
    return axios.get(`/api/v1/users/${userId}/favourites`, header())
      .then(res => {
        if (res) {
          dispatch(getFavouriteAction({ favouriteRecipes: res.data.favouriteRecipes }));
          callback(true);
        }
      })
      .catch(error => {
        dispatch(getFavouriteError({
          errors: {
            status: error.response.status,
            message: error.response.data.message
          }
        }));
        callback(false);
      })
  }
}

export const removeFavourite = (data, callback) => {
  return dispatch => {
    dispatch(removeFavouriteError(null));
    dispatch(removeFavouriteAction({}));
    return axios.delete(`/api/v1/users/${data.userId}/favourites`, { recipeId: data.recipeId }, header())
      .then(res => {
        if (res) {
          callback(true);
        }
      })
      .catch(error => {
        dispatch(removeFavouriteError({
          errors: {
            status: error.response.status,
            message: error.response.data.message
          }
        }));
        callback(false);
      })
  }
}

