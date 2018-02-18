import axios from 'axios';
import { ADD_RECIPE, REQUEST_ADD_RECIPE } from '../actions/types';
import header from '../helper/getHeader';
import imageUpload from './common/imageUpload';

/**
 * @description A function to dispatch an action to add recipe action
 * 
 * @param {Oject} recipe
 * 
 * @return {Object} action dispatch by the action creator
 */
const addRecipe = (recipe) => {
  return {
    type: ADD_RECIPE,
    payload: recipe
  }
};

/**
 * @description A function to dispatch request add recipe action
 * 
 * @param {Oject} isRequesting
 * 
 * @return {Object} action dispatch by the action creator
 */
const requestAddRecipe = (isRequesting) => {
  return {
    type: REQUEST_ADD_RECIPE,
    payload: isRequesting
  }
};

/**
 * @description A function to add a recipe
 * 
 * @param {Oject} recipe
 * @param {Oject} Materialize
 * @param {fuction} history
 * 
 * @return {Object} action dispatch by the action creator
 */
const addRecipeAction = (recipe, Materialize, history) => {
  return dispatch => {
    dispatch(requestAddRecipe({ isRequesting: true }));
    imageUpload(recipe.imageUrl)
      .then((image) => {
        const { title, description, direction, ingredients } = recipe;
        const { data: { url } } = image;
        const recipeDetails = {
          title,
          description,
          direction,
          ingredients,
          imageUrl: url
        }
        axios.defaults.headers.common.authorization = window.localStorage.getItem('userToken');
        return axios.post('/api/v1/recipes', recipeDetails)
          .then(response => {
            if (response) {
              dispatch(requestAddRecipe({ isRequesting: false }));
              const { data: { recipe, message } } = response;
              dispatch(addRecipeAction({
                recipe,
                message
              }));
              Materialize.toast(message, 3000, 'green');
              return history.push('/myrecipes');
            }
          })
          .catch(error => {
            dispatch(requestAddRecipe({ isRequesting: false }));
            const { response: { status, data: { message } } } = error;
            if (status === 400) {
              message.map(err => {
                return Materialize.toast(err.msg, 5000, 'red');
              });
            }
            if (status === 409) {
              return Materialize.toast(message, 3000, 'red');
            }
            if (status === 401) {
              return Materialize.toast(message, 3000, 'red');
            }
          });
      })
      .catch((error) => {
        dispatch(requestAddRecipe({ isRequesting: false }));
        return Materialize.toast(error, 5000, 'red');
      });
  }
};

export default addRecipeAction;
