import axios from 'axios';
import header from '../helper/getHeader';
import imageUplaod from './common/imageUpload';
import {
  UPDATE_RECIPE,
  REQUEST_UPDATE_RECIPE,
} from '../actions/types';

/**
 * @description A function to dispatch an action on update recipe success
 * 
 * @param {object} recipe
 * 
 * @return {Object} action dispatch by the action creator
 */
const updateRecipeAction = (recipe) => {
  return {
    type: UPDATE_RECIPE,
    payload: recipe
  }
}

/**
 * @description A function to dispatch an action on requesting update recipe
 * 
 * @param {object} isRequesting
 * 
 * @return {Object} action dispatch by the action creator
 */
const requestUpdateRecipe = (isRequesting) => {
  return {
    type: REQUEST_UPDATE_RECIPE,
    payload: isRequesting
  }
}

/**
 * @description A function to update recipe
 * 
 * @param {number} id
 * @param {object} recipe
 * 
 * @return {Object} action dispatch by the action creator
 */
const updateRecipeDb = (id, recipe) => {
  const { title, description, direction, ingredients, imageUrl } = recipe;
  const recipeDetails = {
    title,
    description,
    direction,
    ingredients,
    imageUrl
  }
  return axios.put(`/api/v1/recipes/${id}`, recipeDetails, header())
}

/**
 * @description A function display error message
 * 
 * @param {number} status
 * @param {object} error
 * @param {object} Materialize
 * 
 * @return {Object} action dispatch by the action creator
 */
const handleError = (status, error, Materialize) => {
  if (status === 400) {
    error.message.map(err => {
      return Materialize.toast(err.msg, 5000, 'red');
    });
  } else return Materialize.toast(message, 3000, 'red');
}

/**
 * @description A function to update recipe
 * 
 * @param {number} id
 * @param {object} recipeData
 * @param {object} Materialize
 * 
 * @return {Object} action dispatch by the action creator
 */
const updateRecipe = (id, recipeData, Materialize) => {
  return dispatch => {
    dispatch(requestUpdateRecipe({
      isRequesting: true
    }));
    if (recipeData.isImageChanged) {

      const {
        title,
        description,
        direction,
        ingredients,
        image
      } = recipeData

      imageUplaod(image)
        .then((imageDetials) => {
          const { data: { url } } = imageDetials;
          const recipeDetails = {
            title,
            description,
            direction,
            ingredients,
            imageUrl: url
          }
          updateRecipeDb(id, recipeDetails, Materialize)
            .then(response => {
              const { data: { recipe } } = response;
              dispatch(requestUpdateRecipe({
                isRequesting: false
              }));
              dispatch(updateRecipeAction({
                recipe
              }))
              return Materialize.toast('Recipe Updated', 3000, 'green');
            })
            .catch(error => {
              const { response: { data, status } } = error;
              dispatch(requestUpdateRecipe({
                isRequesting: false
              }));
              return handleError(status, data, Materialize);
            });
        })
    } else {
      updateRecipeDb(id, recipeData, Materialize)
        .then(response => {
          const { data: { recipe } } = response;
          dispatch(requestUpdateRecipe({
            isRequesting: false
          }));
          dispatch(updateRecipeAction({
            recipe
          }))
          return Materialize.toast('Recipe Updated', 3000, 'green');
        })
        .catch(error => {
          const { response: { data, status } } = error;
          dispatch(requestUpdateRecipe({
            isRequesting: false
          }));
          return handleError(status, data, Materialize);
        });
    }
  }
}

export default updateRecipe;
