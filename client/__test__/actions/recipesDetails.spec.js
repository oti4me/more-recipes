import moxios from 'moxios';
import recipeDetails from '../../src/actions/recipeDetails';
import {
  GET_RECIPE, GET_RECIPE_ERROR,
} from '../../src/actions/types';

const url = '/api/v1/recipes/';

describe('Recipes details suite', () => {

  const recipe = {
    title: 'Rice and Bean',
    description: 'Rice and Bean',
    direction: 'Rice and Bean',
    ingredients: 'Rice and Bean',
    imageUrl: 'image.jpg'
  };

  beforeEach(() => {
    moxios.install()
  });

  afterEach(() => {
    moxios.uninstall()
  });

  it('Should return success if recipe found', () => {
    const expectedActions = {
      type: GET_RECIPE,
      payload: { recipe }
    };

    moxios.stubRequest(`${url}1`, {
      status: 200,
      response: { recipe }
    });
    store.dispatch(recipeDetails(1, history))
      .then(() => {
        expect(store.getActions()[2]).toEqual(expectedActions);
      })
  });

  it('Should return 404 if no recipe found', () => {
    const expectedActions = {
      payload: {
        error: undefined
      }, type: GET_RECIPE_ERROR
    };

    moxios.stubRequest(`${url}1`, {
      status: 404,
      response: { recipe: {} }
    });
    store.dispatch(recipeDetails(1, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Should handle uncaught error', () => {
    const expectedActions = {
      type: GET_RECIPE_ERROR,
      payload: null
    };

    moxios.stubRequest(`${url}1`, {
      status: 500,
      response: { recipe: {} }
    });
    store.dispatch(recipeDetails(1, history))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      })
  });


});