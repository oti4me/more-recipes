import moxios from 'moxios';
import updateRecipe from '../../src/actions/updateRecipe';
import {
  UPDATE_RECIPE,
  REQUEST_UPDATE_RECIPE,
} from '../../src/actions/types';

const url = '/api/v1/recipes/';

const history = {
  push: () => { }
}

const recipe = {
  title: 'rice and beans',
  description: 'beans and yam',
  direction: 'this is a simple direction',
  ingredients: 'this is a simple ingredients',
  imageUrl: 'image.jpg'
}

describe('Update Recipe Suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should update a recipes detail', () => {
    const expectedActions = [{
      type: 'REQUEST_UPDATE_RECIPE',
      payload: { isRequesting: true }
    }]

    moxios.stubRequest(`${url}update/1`, {
      status: 200,
      response: recipe
    });
    store.dispatch(updateRecipe(1, recipe))
    expect(store.getActions()).toEqual(expectedActions);
  });

});
