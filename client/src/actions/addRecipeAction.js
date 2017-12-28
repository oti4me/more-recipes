import axios from 'axios';
import { ADD_RECIPE, REQUEST_ADD_RECIPE } from '../actions/types';
import header from '../helper/getHeader';

const addRecipeAction = (data) => {
  return {
    type: ADD_RECIPE,
    payload: data
  }
}

const requestAddRecipe = (data) => {
  return {
    type: REQUEST_ADD_RECIPE,
    payload: data
  }
}

const addRecipe = (data, callback) => {
  return dispatch => {
    dispatch(addRecipeAction({ added: false, recipe: {}, message: '', error: {} }));
    dispatch(requestAddRecipe({ isRequesting: true }));
    let formData = new FormData();
    formData.append('file', data.image);
    formData.append('upload_preset', 'y5ewfnvb');
    return axios({
      method: 'POST',
      url: 'https://api.cloudinary.com/v1_1/oti4me/image/upload',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    }).then((response) => {
      const { title, description, direction, ingredients } = data;
      const recipeData = {
        title,
        description,
        direction,
        ingredients,
        image: response.data.url
      }
      axios.post('/api/v1/recipes', recipeData, header())
        .then(res => {
          if (res) {
            dispatch(requestAddRecipe({ isRequesting: false }));
            dispatch(addRecipeAction({ added: true, recipe: res.data.recipe, message: res.data.message }));
            callback();
          }
        })
        .catch(error => {
          dispatch(requestAddRecipe({ isRequesting: false }));
          dispatch(addRecipeAction({ added: false, recipe: {}, message: '', error: { ...error.response } }));
          callback();
        })

    })
      .catch((error) => {
        dispatch(requestAddRecipe({ isRequesting: false }));
        dispatch(addRecipeAction({ added: false, recipe: {}, message: '', error: { ...error.response } }));
        callback();
      });
  }
}

export default addRecipe;
