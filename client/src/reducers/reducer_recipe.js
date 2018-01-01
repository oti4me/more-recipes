import { ADD_RECIPE, REQUEST_ADD_RECIPE, MY_RECIPES, MY_RECIPES_ERROR, GET_REVIEWS, ADD_REVIEW, ADD_REVIEW_ERRORS, ADD_FAVOURITE, ADD_FAVOURITE_ERRORS, GET_FAVOURITE, GET_FAVOURITE_ERRORS, REMOVE_FAVOURITE, REMOVE_FAVOURITE_ERRORS, UPVOTE_RECIPE, UPVOTE_RECIPE_ERRORS, DOWNVOTE_RECIPE, DOWNVOTE_RECIPE_ERRORS } from '../actions/types';

const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return { ...state, ...action.payload };
      break;

    case REQUEST_ADD_RECIPE:
      return { ...state, ...action.payload };
      break;

    case 'UPDATE_RECIPE':
      return { ...state, ...action.payload };
      break;

    case 'DELETE_RECIPE':
      return { ...state, ...action.payload };
      break;

    case MY_RECIPES:
      return { ...state, ...action.payload };
      break;

    case MY_RECIPES_ERROR:
      return { ...state, ...action.payload };
      break;

    case 'GET_RECIPE':
      return { ...state, ...action.payload };
      break;

    case 'GET_RECIPES':
      return { ...state, ...action.payload };
      break;

    case GET_FAVOURITE:
      return { ...state, ...action.payload };
      break;

    case GET_FAVOURITE_ERRORS:
      return { ...state, ...action.payload };
      break;

    case REMOVE_FAVOURITE:
      return { ...state, ...action.payload };
      break;

    case REMOVE_FAVOURITE_ERRORS:
      return { ...state, ...action.payload };
      break;

    case ADD_FAVOURITE:
      return { ...state, ...action.payload };
      break;

    case ADD_FAVOURITE_ERRORS:
      return { ...state, ...action.payload };
      break;

    case 'REMOVE_FAVOURITE_RECIPE':
      return { ...state, ...action.payload };
      break;

    case ADD_REVIEW:
      return { ...state, ...action.payload };
      break;

    case ADD_REVIEW_ERRORS:
      return { ...state, ...action.payload };
      break;

    case GET_REVIEWS:
      return { ...state, ...action.payload };
      break;

    case UPVOTE_RECIPE:
      return { ...state, ...action.payload };
      break;

    case UPVOTE_RECIPE_ERRORS:
      return { ...state, ...action.payload };
      break;

    case DOWNVOTE_RECIPE:
      return { ...state, ...action.payload };
      break;

    case DOWNVOTE_RECIPE_ERRORS:
      return { ...state, ...action.payload };
      break;
  }
  return state;
}

export default recipeReducer;