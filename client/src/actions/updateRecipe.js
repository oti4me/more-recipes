import { UPDATE_RECIPE, REQUEST_UPDATE_RECIPE, UPDATE_RECIPE_ERROR } from '../actions/types';
import axios from 'axios';
import header from '../helper/getHeader';
import imageUplaod from './common/imageUpload';

const updateRecipeAction = (recipe) => {
  return {
    type: UPDATE_RECIPE,
    payload: recipe
  }
}

const requestUpdateRecipe = (isRequesting) => {
  return {
    type: REQUEST_UPDATE_RECIPE,
    payload: isRequesting
  }
}

const updateRecipeError = (error) => {
  return {
    type: UPDATE_RECIPE_ERROR,
    payload: error
  }
}

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

const handleError = (status, error, Materialize) => {
  if (status === 400) {
    error.message.map(err => {
      return Materialize.toast(err.msg, 5000, 'red');
    });
  } else return Materialize.toast(message, 3000, 'red');
}

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
