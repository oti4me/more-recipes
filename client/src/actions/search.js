import axios from 'axios';
import { SEARCH_RECIPE, SEARCH_RECIPE_ERROR } from '../actions/types';
import header from '../helper/getHeader';

/**
 * @description A function to dispatch an action on search success
 * 
 * @param {array} recipes
 * 
 * @return {Object} action dispatch by the action creator
 */
const searchAction = (recipes) => {
  return {
    type: SEARCH_RECIPE,
    payload: recipes
  }
}

/**
 * @description A function to dispatch an action to get recipes
 * 
 * @param {object} error
 * 
 * @return {Object} action dispatch by the action creator
 */
const searchError = (error) => {
  return {
    type: SEARCH_RECIPE_ERROR,
    payload: error
  }
}

/**
 * @description A function to search recipes
 * 
 * @param {string} query
 * 
 * @return {Object} request promise object
 */
const search = (query) => {
  return dispatch => {

    if (query.length < 2) {
      dispatch(searchAction({
        searchedRecipes: undefined
      }));
      return false;
    }

    return axios.post(`/api/v1/recipes/search?key=${query}`, {}, header())
      .then(response => {
        const { data: { recipes } } = response;
        dispatch(searchAction({
          searchedRecipes: recipes
        }));
      })
      .catch(error => {
        if (error) {
          dispatch(searchError({
            searchedRecipes: []
          }));
        }

      })
  }
}

export default search;
