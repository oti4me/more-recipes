import moxios from 'moxios';
import { getAllRecipes } from '../../src/actions/recipes';
import mockStore from '../mockData/mockStore';
import {
  GET_RECIPES,
} from '../../src/actions/types';

const url = '/api/v1/recipes';

describe('Get Recipes Action', () => {

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

});
