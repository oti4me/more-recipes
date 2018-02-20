import moxios from 'moxios';
import deleteRecipe from '../../src/actions/deleteRecipe';
import mockStore from '../mockData/mockStore';
import {
  DELETE_RECIPE,
  DELETE_RECIPE_ERRORS
} from '../../src/actions/types';

const url = '/api/v1/recipes/';

describe('Delete Reecipes Action', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should delete recipe with id 1', () => {
    const id = 1;
    moxios.stubRequest(`${url}1`, {
      status: 200,
      response: { id }
    });
    const expectedActions = {
      id: 1,
      type: DELETE_RECIPE
    };
    const store = mockStore({});
    store.dispatch(deleteRecipe(id)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
    });
  });

  it('Should dispatch a 400 error if recipe does not exist', () => {
    const id = 1;
    moxios.stubRequest(`${url}1`, {
      status: 400,
      response: { data: { message: '' }, status: 400 }
    });
    const expectedActions = {
      error: {
        errors: {
          message: undefined, "status": 400
        }
      }, type: DELETE_RECIPE_ERRORS
    };
    const store = mockStore({});
    store.dispatch(deleteRecipe(id)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
    });
  });
});
