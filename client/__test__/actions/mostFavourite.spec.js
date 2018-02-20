import moxios from 'moxios';
import {
  getMostFavouritedRecipes
} from '../../src/actions/getMostFavouritedRecipes';
import mockStore from '../mockData/mockStore';
import {
  GET_FAVOURITED_RECIPES,
} from '../../src/actions/types';

const url = '/api/v1/recipes';

describe('Most favorited recipes suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should get all recipes success', () => {
    const recipes = [];
    moxios.stubRequest(`${url}/toprecipes`, {
      status: 200,
      response: {
        recipes
      }
    });
    const expectedActions = {
      type: GET_FAVOURITED_RECIPES,
      payload: { favouritedRecipes: [] }
    }
    const store = mockStore({});
    store.dispatch(getMostFavouritedRecipes()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions);
    });
  });

});
