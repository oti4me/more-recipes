import _ from 'lodash';
import {
  ADD_RECIPE, REQUEST_ADD_RECIPE, MY_RECIPES,
  MY_RECIPES_ERROR, GET_REVIEWS, ADD_REVIEW,
  ADD_REVIEW_ERRORS, ADD_FAVOURITE, ADD_FAVOURITE_ERRORS,
  GET_FAVOURITE, GET_FAVOURITE_ERRORS, REMOVE_FAVOURITE,
  REMOVE_FAVOURITE_ERRORS, UPVOTE_RECIPE, UPVOTE_RECIPE_ERRORS,
  DOWNVOTE_RECIPE, DOWNVOTE_RECIPE_ERRORS, GET_RECIPES, UPDATE_RECIPE,
  DELETE_RECIPE, GET_RECIPE, SEARCH_RECIPE, SEARCH_RECIPE_ERROR,
  UPDATE_RECIPE_ERROR, REQUEST_UPDATE_RECIPE, IS_FAVOURITE_RECIPE,
  GET_UPVOTED_RECIPES, GET_UPVOTED_RECIPES_ERRORS, GET_FAVOURITED_RECIPES,
  GET_FAVOURITED_RECIPES_ERRORS
} from '../actions/types';




const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return { ...state, ...action.payload };

    case GET_UPVOTED_RECIPES:
      return { ...state, ...action.payload };

    case GET_UPVOTED_RECIPES_ERRORS:
      return { ...state, ...action.payload };

    case GET_FAVOURITED_RECIPES:
      return { ...state, ...action.payload };

    case GET_FAVOURITED_RECIPES_ERRORS:
      return { ...state, ...action.payload };

    case REQUEST_ADD_RECIPE:
      return { ...state, ...action.payload };

    case UPDATE_RECIPE:
      return { ...state, ...action.payload };

    case UPDATE_RECIPE_ERROR:
      return { ...state, ...action.payload };

    case REQUEST_UPDATE_RECIPE:
      return { ...state, ...action.payload };

    case DELETE_RECIPE:
      return {
        ...state,
        myRecipes: state.myRecipes.filter(recipe => (
          recipe.id !== Number(action.id)
        ))
      };

    case MY_RECIPES:
      return { ...state, ...action.payload };

    case MY_RECIPES_ERROR:
      return { ...state, ...action.payload };

    case GET_RECIPE:
      return { ...state, ...action.payload };

    case GET_RECIPES:
      return { ...state, ...action.payload };

    case GET_FAVOURITE:
      return { ...state, ...action.payload };

    case GET_FAVOURITE_ERRORS:
      return { ...state, ...action.payload };

    case IS_FAVOURITE_RECIPE:
      return { ...state, ...action.payload };

    case REMOVE_FAVOURITE:
      return {
        ...state,
        favouriteRecipes: state.favouriteRecipes.filter(recipe => (
          recipe.id !== Number(action.id)
        ))
      };

    case REMOVE_FAVOURITE_ERRORS:
      return { ...state, ...action.payload };

    case ADD_FAVOURITE:
      return { ...state, ...action.payload };

    case ADD_FAVOURITE_ERRORS:
      return { ...state, ...action.payload };

    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload.review, ...state.reviews]
      };

    case ADD_REVIEW_ERRORS:
      return { ...state, ...action.payload };

    case GET_REVIEWS:
      return { ...state, ...action.payload };

    case UPVOTE_RECIPE:
      return { ...state, ...action.payload };

    case UPVOTE_RECIPE_ERRORS:
      return { ...state, ...action.payload };

    case DOWNVOTE_RECIPE:
      return { ...state, ...action.payload };

    case DOWNVOTE_RECIPE_ERRORS:
      return { ...state, ...action.payload };

    case SEARCH_RECIPE:
      return { ...state, ...action.payload };

    case SEARCH_RECIPE_ERROR:
      return { ...state, ...action.payload };
  }
  return state;
}

export default recipeReducer;