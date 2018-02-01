import axios from 'axios';
import header from '../helper/getHeader';


const getMyRecipesAction = (recipes) => {
  return {
    type: 'MY_RECIPES',
    payload: recipes
  }
}

const getMyRecipesErrors = (error) => {
  return {
    type: 'MY_RECIPES_ERROR',
    payload: error
  }
}

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
        if (error.response.status === 404) {
          dispatch(getMyRecipesAction({
            succes: false,
            myRecipes: []
          }));
        }
        dispatch(getMyRecipesErrors({
          succes: false,
          error: error
        }));
      })
  }
}

export default getMyRecipes;
