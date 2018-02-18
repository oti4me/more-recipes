import axios from 'axios';
import header from '../helper/getHeader';
import {
  ADD_FAVOURITE,
  ADD_FAVOURITE_ERRORS,
  REMOVE_FAVOURITE,
  REMOVE_FAVOURITE_ERRORS,
  IS_FAVOURITE_RECIPE
} from '../actions/types';


/**
 * @description A function to dispatch an action to add favourite
 * 
 * @param {object} favourite
 * 
 * @return {Object} action dispatch by the action creator
 */
export const addFavouriteAction = (favourite) => {
  return {
    type: ADD_FAVOURITE,
    payload: favourite
  }
};


/**
 * @description A function to dispatch an action on add favourite error
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const addFavouriteError = (error) => {
  return {
    type: ADD_FAVOURITE_ERRORS,
    payload: error
  }
};


/**
 * @description A function to dispatch an action to get favourite recipes
 * 
 * @param {array} favourites
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getFavouriteAction = (favourites) => {
  return {
    type: ADD_FAVOURITE,
    payload: favourites
  }
};


/**
 * @description A function to dispatch an action on get favourite error
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getFavouriteError = (error) => {
  return {
    type: ADD_FAVOURITE_ERRORS,
    payload: error
  }
};


/**
 * @description A function to dispatch an action on recipe delete
 * 
 * @param {number} id
 * 
 * @return {Object} action dispatch by the action creator
 */
export const removeFavouriteAction = (id) => {
  return {
    type: REMOVE_FAVOURITE,
    id
  }
};


/**
 * @description A function to dispatch an action on removal of recipe
 * 
 * @param {array} favourites
 * 
 * @return {Object} action dispatch by the action creator
 */
export const removeFavouriteError = (favourites) => {
  return {
    type: REMOVE_FAVOURITE_ERRORS,
    payload: favourites
  }
};


/**
 * @description A function to dispatch an action on favourite recipe comfirmation
 * 
 * @param {boolean} isFavourite
 * 
 * @return {Object} action dispatch by the action creator
 */
export const isFavouriteRecipe = (isFavourite) => {
  return {
    type: IS_FAVOURITE_RECIPE,
    payload: isFavourite
  }
};


/**
 * @description A function to add favourtite
 * 
 * @param {object} favouriteDetails
 * @param {object} Materialize
 * 
 * @return {Object} action dispatch by the action creator
 */
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


/**
 * @description A function to get favourite recipes
 * 
 * @param {number} userId
 * @param {number} page
 * 
 * @return {Object} action dispatch by the action creator
 */
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


/**
 * @description A function to check favourite recipe
 * 
 * @param {number} userId
 * @param {number} recipeId
 * 
 * @return {Object} action dispatch by the action creator
 */
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


/**
 * @description A function to remove favourite recipe
 * 
 * @param {object} favouriteDetail
 * 
 * @return {Object} action dispatch by the action creator
 */
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
