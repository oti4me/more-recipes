import moxios from 'moxios';
import getMyRecipes from '../../src/actions/getMyRecipes';
import {
  MY_RECIPES,
  MY_RECIPES_ERROR
} from '../../src/actions/types';

const url = '/api/v1/users/';

describe('My Recipe Action Suite', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  it('Should get a list of user\'s recipes', () => {
    const recipes = [];
    const pagination = {};
    const expectedActions = [{
      type: MY_RECIPES,
      payload: {
        succes: true,
        myRecipes: [],
        pagination: {}
      }
    }]
    moxios.stubRequest(`${url}1/recipes?page=1`, {
      status: 200,
      response: { recipes, pagination }
    });
    store.dispatch(getMyRecipes(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('Should return a 404 error if no recipe is return for the user',
    () => {
      const expectedActions = [
        {
          payload: {
            myRecipes: [],
            pagination: {},
            succes: true
          },
          type: MY_RECIPES
        }, {
          payload: {
            myRecipes: [],
            succes: false
          },
          type: MY_RECIPES
        }, {
          payload: {
            error: undefined,
            succes: false
          }, type: MY_RECIPES_ERROR
        }];

      moxios.stubRequest(`${url}1/recipes?page=1`, {
        status: 404,
        response: { error: 'error' }
      });
      store.dispatch(getMyRecipes(1, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
    });
});