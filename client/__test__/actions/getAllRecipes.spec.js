import moxios from 'moxios';
import getAllRecipes from '../../src/actions/getAllRecipes';
import mockStore from '../mockData/mockStore';
import {
  GET_RECIPES, GET_RECIPES_ERRORS,
} from '../../src/actions/types';

const url = '/api/v1/recipes';

describe('Get recipes action suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should get all recipes success', () => {
    const recipes = [];
    const limit = 1;
    moxios.stubRequest(`${url}?page=1`, {
      status: 200,
      response: { recipes, pagination: {} }
    });
    const expectedActions = {
      type: GET_RECIPES,
      payload: {
        allRecipes: [],
        pagination: {}
      }
    };
    const store = mockStore({});
    store.dispatch(getAllRecipes(limit)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
    });
  });

  it('Should get all recipes success', () => {
    const recipes = [];
    const limit = 1;
    moxios.stubRequest(`${url}?page=1`, {
      status: 404,
      response: { response: { message: 'error' } }
    });
    const expectedActions = [{
      payload: null,
      type: GET_RECIPES_ERRORS
    }, {
      payload: {},
      type: GET_RECIPES
    }, {
      payload: {
        allRecipes: []
      }, type: GET_RECIPES
    }, {
      payload: {
        error: {
          message: {
            response: {
              message: "error"
            }
          }
        }
      }, "type": "GET_RECIPES_ERRORS"
    }]
    const store = mockStore({});
    store.dispatch(getAllRecipes(limit)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
