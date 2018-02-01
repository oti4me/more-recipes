import axios from 'axios';
import header from '../helper/getHeader';
import {
  ADD_FAVOURITE,
  ADD_FAVOURITE_ERRORS,
  REMOVE_FAVOURITE,
  REMOVE_FAVOURITE_ERRORS,
  IS_FAVOURITE_RECIPE
} from '../actions/types';

export const addFavouriteAction = (favourite) => {
  return {
    type: ADD_FAVOURITE,
    payload: favourite
  }
};

export const addFavouriteError = (error) => {
  return {
    type: ADD_FAVOURITE_ERRORS,
    payload: error
  }
};

export const getFavouriteAction = (favourite) => {
  return {
    type: ADD_FAVOURITE,
    payload: favourite
  }
};

export const getFavouriteError = (error) => {
  return {
    type: ADD_FAVOURITE_ERRORS,
    payload: error
  }
};

export const removeFavouriteAction = (id) => {
  return {
    type: REMOVE_FAVOURITE,
    id
  }
};

export const removeFavouriteError = (favourite) => {
  return {
    type: REMOVE_FAVOURITE_ERRORS,
    payload: favourite
  }
};

export const isFavouriteRecipe = (isFavourite) => {
  return {
    type: IS_FAVOURITE_RECIPE,
    payload: isFavourite
  }
};

export const addFavourite = ({ userId, recipeId }, Materialize) => {
  return dispatch => {
    dispatch(addFavouriteError(null));
    dispatch(addFavouriteAction({}));
    return axios.post(`/api/v1/users/${userId}/favourites/${recipeId}`,
      {},
      header()
    )
      .then(res => {
        if (res) {
          const { status, data: { message } } = res;
          dispatch(addFavouriteAction({
            favourites: {
              status,
              message
            }
          }));
          if (message === 'Favourite recipe added') {
            dispatch(isFavouriteRecipe({
              isFavourite: true
            }));
            return Materialize.toast(message, 3000, 'green');
          }
          dispatch(isFavouriteRecipe({
            isFavourite: false
          }));
          return Materialize.toast(message, 3000, 'red');
        }
      })
      .catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(addFavouriteError({
          errors: {
            status,
            message
          }
        }));
      })
  }
};

export const getFavourites = (userId, page = 1) => {
  return dispatch => {
    return axios.get(`/api/v1/users/${userId}/favourites?page=${page}`, header())
      .then(response => {
        if (response) {
          const { data: { favouriteRecipes, pagination } } = response;
          dispatch(getFavouriteAction({
            favouriteRecipes,
            pagination
          }));
        }
      })
      .catch(error => {
        const { response: { status, data: { message } } } = error;
        if (status === 404) {
          return dispatch(getFavouriteAction({
            succes: false,
            favouriteRecipes: []
          }));
        }
        dispatch(getFavouriteError({
          errors: {
            status,
            message: message
          }
        }));
      })
  }
};

export const checkFavourite = (userId, recipeId) => {
  return dispatch => {
    dispatch(isFavouriteRecipe({
      isFavourite: false
    }));
    dispatch(getFavouriteError(null));
    dispatch(getFavouriteAction({}));
    return axios.get(`/api/v1/users/${userId}/favourites/${recipeId}`, header())
      .then(res => {
        if (res) {
          dispatch(isFavouriteRecipe({
            isFavourite: true
          }));
        }
      })
      .catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(getFavouriteError({
          errors: {
            status,
            message
          }
        }));
      })
  }
};

export const removeFavourite = (favouriteDetail) => {
  const { userId, recipeId } = favouriteDetail;
  return dispatch => {
    dispatch(removeFavouriteError(null));
    return axios.delete(`/api/v1/users/${userId}/favourites/${recipeId}`, header())
      .then(res => {
        if (res) {
          dispatch(removeFavouriteAction(recipeId));
        }
      })
      .catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(removeFavouriteError({
          errors: {
            status,
            message
          }
        }));
      })
  }

};
