import moxios from 'moxios';
import search from '../../src/actions/search';
import mockStore from '../mockData/mockStore';
import {
  SEARCH_RECIPE,
  SEARCH_RECIPE_ERROR
} from '../../src/actions/types';

const url = '/api/v1/recipes/';

const history = {
  push: () => { }
}

describe('Search Action Suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should search for recipes on the platform', () => {

    const recipes = [];
    const expectedActions = [
      {
        payload: {
          searchedRecipes: []
        },
        type: SEARCH_RECIPE
      }
    ]

    moxios.stubRequest(`${url}search?key=beasn`, {
      status: 200,
      response: {
        recipes
      }
    });
    const store = mockStore({})
    store.dispatch(search('beasn', Materialize, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

  it('Should search for recipes on the platform', () => {

    const expectedActions = [{
      payload: { "searchedRecipes": [] },
      type: SEARCH_RECIPE_ERROR
    }]

    moxios.stubRequest(`${url}search?key=beasn`, {
      status: 404,
      error: {}
    });
    const store = mockStore({})
    store.dispatch(search('beasn', Materialize, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

});
