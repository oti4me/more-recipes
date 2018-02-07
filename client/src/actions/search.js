import axios from 'axios';
import { SEARCH_RECIPE, SEARCH_RECIPE_ERROR } from '../actions/types';
import header from '../helper/getHeader';

const searchAction = (recipes) => {
  return {
    type: SEARCH_RECIPE,
    payload: recipes
  }
}

const searchError = (error) => {
  return {
    type: SEARCH_RECIPE_ERROR,
    payload: error
  }
}

const search = (query) => {
  return dispatch => {
    dispatch(searchAction({}));
    return axios.post(`/api/v1/recipes/search?key=${query}`, {}, header())
      .then(response => {
        const { data: { recipes } } = response;
        dispatch(searchAction({
          searchedRecipes: recipes
        }));
      })
      .catch(error => {
        dispatch(searchError({
          error: { ...error.response },
          searchedRecipes: []
        }));
      })
  }
}

export default search;
