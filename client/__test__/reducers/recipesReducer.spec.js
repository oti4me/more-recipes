import recipeReducer from '../../src/reducers/recipeReducer';
import recipeMock from '../mockData/recipeMock';
import {
  ADD_RECIPE,
  REQUEST_ADD_RECIPE,
  GET_RECIPE,
  GET_RECIPES,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  GET_UPVOTED_RECIPES,
  GET_UPVOTED_RECIPES_ERRORS,
  GET_FAVOURITED_RECIPES,
  GET_FAVOURITED_RECIPES_ERRORS,
  UPDATE_RECIPE_ERROR,
  REQUEST_UPDATE_RECIPE,
  MY_RECIPES,
  MY_RECIPES_ERROR,
  GET_FAVOURITE,
  GET_FAVOURITE_ERRORS,
  IS_FAVOURITE_RECIPE,
  REMOVE_FAVOURITE,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE_ERRORS,
  GET_REVIEWS,
  UPVOTE_RECIPE
} from '../../src/actions/types';
import { error } from 'util';

let state = {
  recipes: {}
}

const {
  recipe,
  requesting,
  updatedRecipe,
  myRecipes
} = recipeMock;
const message = 'Recipe added';

const addRecipeAction = {
  type: ADD_RECIPE,
  payload: {
    recipe,
    message
  }
}

const requestAddRecipeAction = {
  type: REQUEST_ADD_RECIPE,
  payload: requesting
}

const getRecipeAction = {
  type: GET_RECIPE,
  payload: requesting
}

const getRecipesAction = {
  type: GET_RECIPES,
  payload: requesting
}

const updateRecipeAction = {
  type: UPDATE_RECIPE,
  payload: updatedRecipe
}

const updateRecipeActionError = {
  type: UPDATE_RECIPE_ERROR,
  payload: { error: { message: 'error' } }
}

const deleteRecipeAction = {
  type: DELETE_RECIPE,
  id: 1
}

const getUpvotedRcipes = {
  type: GET_UPVOTED_RECIPES,
  payload: [{ ...recipeMock.recipe }]
}

const getUpvotedRcipesError = {
  type: GET_UPVOTED_RECIPES_ERRORS,
  payload: { error: { message: 'error message' } }
}

const getMostFavourite = {
  type: GET_FAVOURITED_RECIPES,
  payload: {
    favouritedRecipes: [
      recipeMock.recipe
    ]
  }
}

const getMostFavouriteErrors = {
  type: GET_FAVOURITED_RECIPES_ERRORS,
  payload: {
    error: { message: 'error' }
  }
}

const requestRecipeUpdate = {
  type: REQUEST_UPDATE_RECIPE,
  payload: { isRequesting: true }
}

const getMyRecipesList = {
  type: MY_RECIPES,
  payload: [recipeMock.recipe]
}

const getMyRecipesError = {
  type: MY_RECIPES_ERROR,
  payload: {
    succes: false,
    error: { message: 'error' }
  }
}

const getFavouriteRecipes = {
  type: GET_FAVOURITE,
  payload: {
    succes: false,
    recipes: [
      recipeMock.recipe
    ]
  }
}

const isFavouriteRecipes = {
  type: IS_FAVOURITE_RECIPE,
  payload: { isFavourite: true }
}

const favouriteRecipesErrors = {
  type: GET_FAVOURITE_ERRORS,
  payload: { error: { message: 'error' } }
}

const removeFavouriteRecipe = {
  type: REMOVE_FAVOURITE,
  payload: { id: 1 }
}

const addFavouriteRecipe = {
  type: ADD_FAVOURITE,
  payload: { ...recipeMock.recipe }
}

const removeFavouriteErrors = {
  type: REMOVE_FAVOURITE_ERRORS,
  payload: { ...recipeMock.recipe }
}

const getReviews = {
  type: GET_REVIEWS,
  payload: [recipeMock.review]
}

const addUpvote = {
  type: UPVOTE_RECIPE,
  payload: {
    message,
    recipe
  }
}

describe('Recipe reducer test', () => {

  it('should have a default state', () => {
    expect(recipeReducer(undefined, { type: 'nonexisting' })).toEqual({});
  });

  it('should handle add recipe reducer', () => {
    expect(recipeReducer(state, addRecipeAction)).toEqual({
      ...state, ...addRecipeAction.payload
    });
  });

  it('should check request add recipe reducer', () => {
    expect(recipeReducer(state, requestAddRecipeAction)).toEqual({
      ...state, ...requestAddRecipeAction.payload
    });
  });

  it('should check add recipe error', () => {
    expect(recipeReducer(state, requestAddRecipeAction)).toEqual({
      ...state, ...requestAddRecipeAction.payload
    });
  });

  it('should check get one recipe', () => {
    expect(recipeReducer(state, getRecipeAction)).toEqual({
      ...state, ...getRecipeAction.payload
    });
  });

  it('should check get all recipes', () => {
    expect(recipeReducer(state, getRecipesAction)).toEqual({
      ...state, ...getRecipesAction.payload
    });
  });

  it('should check update recipe', () => {
    expect(recipeReducer(state, updateRecipeAction)).toEqual({
      ...state, ...updateRecipeAction.payload
    });
  });

  it('should check delete recipe', () => {
    expect(recipeReducer(state = { myRecipes }, deleteRecipeAction)).toEqual({
      ...state, myRecipes: state.myRecipes.filter(recipe => (
        recipe.id !== Number(deleteRecipeAction.id)
      ))
    });
  });

  it('should delete a recipe', () => {
    expect(recipeReducer(state = { myRecipes }, deleteRecipeAction)).toEqual({
      ...state, myRecipes: state.myRecipes.filter(recipe => (
        recipe.id !== Number(deleteRecipeAction.id)
      ))
    });
  });

  it('should get most upvoted recipes', () => {
    const returnedState = recipeReducer({}, getUpvotedRcipes);
    expect(returnedState).toEqual({ "0": { ...recipeMock.recipe } });
  });

  it('should get most upvoted errors', () => {
    const returnedState = recipeReducer({}, getUpvotedRcipesError);
    expect(returnedState).toEqual({ error: { message: 'error message' } });
  });

  it('should get most upvoted recipes', () => {
    const returnedState = recipeReducer({}, getMostFavourite);
    expect(returnedState).toEqual({
      favouritedRecipes: [
        recipeMock.recipe
      ]
    });
  });

  it('should get most upvoted recipes', () => {
    const returnedState = recipeReducer({}, getMostFavouriteErrors);
    expect(returnedState).toEqual({
      error: { message: 'error' }
    });
  })
    ;
  it('should get most update recipes error', () => {
    const returnedState = recipeReducer({}, updateRecipeActionError);
    expect(returnedState).toEqual({
      error: { message: 'error' }
    });
  });

  it('should request recipe update', () => {
    const returnedState = recipeReducer({}, requestRecipeUpdate);
    expect(returnedState).toEqual({
      isRequesting: true
    });
  });

  it('should get a user\'s recipes list', () => {
    const returnedState = recipeReducer({}, getMyRecipesList);
    expect(returnedState[0]).toEqual(recipeMock.recipe);
  });

  it('should get a user\'s recipes list', () => {
    const returnedState = recipeReducer({}, getMyRecipesError);
    expect(returnedState).toEqual({
      succes: false,
      error: { message: 'error' }
    });
  });

  it('should get a user\'s favourite recipes list', () => {
    const returnedState = recipeReducer({}, getFavouriteRecipes);
    expect(returnedState.recipes).toEqual([recipeMock.recipe]);
  });

  it('should flag get favourites recipes error', () => {
    const returnedState = recipeReducer({}, favouriteRecipesErrors);
    expect(returnedState).toEqual({
      error: { message: 'error' }
    });
  });

  it('should check if a usr has a recipe as favourite', () => {
    const returnedState = recipeReducer({}, isFavouriteRecipes);
    expect(returnedState).toEqual({
      isFavourite: true
    });
  });

  it('should flag favourites recipes error', () => {
    const returnedState = recipeReducer({}, isFavouriteRecipes);
    expect(returnedState).toEqual({
      isFavourite: true
    });
  });

  it('should add favourites recipes', () => {
    const returnedState = recipeReducer({}, addFavouriteRecipe);
    expect(returnedState).toEqual({
      ...recipeMock.recipe
    });
  });

  it('should flag remove favourites errors', () => {
    const returnedState = recipeReducer({}, removeFavouriteErrors);
    expect(returnedState).toEqual({
      ...recipeMock.recipe
    });
  });

  it('should get reviews for a recipe', () => {
    const returnedState = recipeReducer({}, getReviews);
    expect(returnedState[0]).toEqual(
      recipeMock.review
    );
  });

  it('should upvote a recipe', () => {
    const returnedState = recipeReducer({}, addUpvote);
    expect(returnedState).toEqual({
      message,
      recipe
    });
  });

});