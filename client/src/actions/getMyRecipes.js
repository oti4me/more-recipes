import axios from 'axios';
import header from '../helper/getHeader';

/**
 * @description A function that dispatches an action on successful fetching of a user's recipes list
 * 
 * @param {array} recipes
 * 
 * @return {Object} action dispatch by the action creator
 */
const getMyRecipesAction = (recipes) => {
  return {
    type: 'MY_RECIPES',
    payload: recipes
  }
}

/**
 * @description A function that dispatches an action failure fetching of a user's recipes list
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
const getMyRecipesErrors = (error) => {
  return {
    type: 'MY_RECIPES_ERROR',
    payload: error
  }
}

/**
 * @description A function that dispatches an action failure fetching of a user's recipes list
 * 
 * @param {number} id
 * @param {number} page
 * 
 * @return {Object} request promise object
 */
const getMyRecipes = (id, page) => {
  return dispatch => {
    return axios.get(`/api/v1/users/${id}/recipes?page=${page}`, header())
      .then(res => {
        const { data: { recipes, pagination } } = res;
        dispatch(getMyRecipesAction({
          succes: true,
          myRecipes: recipes,
          pagination
        }));
      })
      .catch(error => {
        const { response: { data: { message } } } = error;
        if (error.response.status === 404) {
          dispatch(getMyRecipesAction({
            succes: false,
            myRecipes: []
          }));
        }
        dispatch(getMyRecipesErrors({
          succes: false,
          error: message
        }));
      })
  }
}

export default getMyRecipes;
