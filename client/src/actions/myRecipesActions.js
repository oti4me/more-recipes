import axios from 'axios';
import header from '../helper/getHeader';


const getMyRecipesAction = (data) => {
  return {
    type: 'MY_RECIPES',
    payload: data
  }
}

const getMyRecipesErrors = (data) => {
  return {
    type: 'MY_RECIPES_ERROR',
    payload: data
  }
}

const getMyRecipes = (id, callback) => {
  return dispatch => {
    return axios.get(`/api/v1/users/${id}/recipes`, header())
      .then(res => {
        dispatch(getMyRecipesAction({
          succes: true,
          myRecipes: res.data.recipes
        }));
        callback();
      })
      .catch(error => {
        dispatch(getMyRecipesErrors({
          succes: false,
          error: error
        }));
        callback();
      })
  }
}

export default getMyRecipes;
