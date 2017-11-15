import axios from 'axios';

const header = ({ 
  headers: { 
    'x-access-token' : window.localStorage.userToken,
    authorization : window.localStorage.userToken 
  } 
});

const addRecipeAction = (data) => {
  return {
    type : 'ADD_RECIPE',
    payload : data
  }
}

const getAllRecipeAction = (data) => {
  return {
    type : 'GET_RECIPES',
    payload : data
  }
}

const getAllOneAction = (data) => {
  return {
    type : 'GET_RECIPE',
    payload : data
  }
}

const deleteRecipeAction = (data) => {
  return {
    type : 'DELETE_RECIPE',
    payload : data
  }
}

const updateRecipeAction = (data) => {
  return {
    type : 'UPDATE_RECIPE',
    payload : data
  }
}

export const addRecipe = (data, history, Materialize) =>{
  return dispatch => {
   return axios.post('/api/v1/recipes', data, header)
   .then(res => {
     console.log(res.data.message);
     if(res){
       dispatch(addRecipeAction(res.data.message));
       Materialize.toast(res.data.message, 3000, 'green');
       history.push('/myrecipes');
     }
   })
  //  .catch(error => {
  //    console.log(error);
    //  if(error.response.status === 400){
    //    console.log(error.response);
    //  }else if(error.response.status === 401){
    //    console.log(error.response);
    //  }else{
    //    console.log(error);
    //  }
  //  });
 }
}

export const removeRecipe = (id, history, dispatch) =>{
  return dispatch => {

   return axios.delete('/api/v1/recipes/'+id, header)
   .then(res => {
     console.log(res);
     if(res){
       
     }
   })
   .catch(error => {
     if(error.response.status === 400){
       console.log(error.response.data);
     }else if(error.response.status === 401){
       console.log(error);
     }else{
       console.log(error);
     }
   });
 }
}

export const updateRecipe = (recipe, history, dispatch) =>{
  return dispatch => {
    console.log(recipe.id, recipe.data);
   return axios.put('/api/v1/recipes/'+recipe.id, recipe.data, header)
   .then(res => {
     console.log(res);
     if(res){
      dispatch(updateRecipeAction(res.data.message));
      Materialize.toast(res.data.message, 3000, 'green');
      // history.push('/myrecipes');
     }
   })
  //  .catch(error => {
  //    if(error.response.status === 400){
  //      console.log(error.response.data.message);
  //    }else{
  //      console.log(error);
  //    }
  //  });
 }
}

export const getAllRecipe = (data, history, dispatch) =>{
  return dispatch => {

   return axios.get('/api/v1/recipes')
  //  .then(res => {
  //   //  console.log(res.data.data);
  //    dispatch(getAllRecipeAction({ allRecipes : res.data }));
  //  })
  //  .catch(error => {
  //    console.log(error.message);
    //  if(error.response.status === 400){
    //    console.log(error);
    //  }else if(error.response.status === 401){
    //    console.log(error);
    //  }else{
    //    console.log(error);
    //  }
  //  });
 }
}

export const getOneRecipe = (id, history, dispatch) =>{
  return dispatch => {

    console.log(id);

   return axios.get('/api/v1/recipes/'+id, header)
   .then(res => {
     console.log(res);
     if(res){
      
     }
   })
   .catch(error => {
     if(error.response.status === 400){
       console.log(error);
     }else if(error.response.status === 401){
       console.log(error);
     }else{
       console.log(error);
     }
   });
 }
}