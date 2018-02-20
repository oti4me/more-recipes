import moxios from 'moxios';
import getMostUpvotedRecipes
 from '../../src/actions/getMostVotedRecipes';
import mockStore from '../mockData/mockStore';
import {
  GET_UPVOTED_RECIPES,
} from '../../src/actions/types';

const url = '/api/v1/recipes';

describe('Most Upvoted Recipes', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should get most favourited recipes', () => {
    moxios
      .stubRequest(`${url}?sort=upvotes&order=desc&page=1`,
      {
        status: 200,
        response: {
          recipes: [], pagination: {}
        }
      });
    const expectedActions = {
      type: GET_UPVOTED_RECIPES,
      payload: {
        upvotedRecipes: [],
        pagination: {}
      }
    }
    const store = mockStore({});
    store.dispatch(getMostUpvotedRecipes(1)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
    });
  });
});
