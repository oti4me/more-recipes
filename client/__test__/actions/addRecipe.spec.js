import moxios from 'moxios';
import addRecipeAction from '../../src/actions/addRecipeAction';
import imageUpload from '../../src/actions/common/imageUpload';
import {
  ADD_RECIPE,
  REQUEST_ADD_RECIPE
} from '../../src/actions/types';

const url = '/api/v1/recipes/';

global.imageUpload = jest.fn(() => {
  then(() => Promise.resolve({}))
});


describe('Add recipe suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should add a new recipe', () => {

    const recipe = {
      title: 'Rice and Bean',
      description: 'Rice and Bean',
      direction: 'Rice and Bean',
      ingredients: 'Rice and Bean',
      imageUrl: {}
    }

    const expectedActions = [
      {
        type: REQUEST_ADD_RECIPE,
        payload: { isRequesting: true }
      }
    ];
    moxios.stubRequest(`${url}`, {
      status: 201,
      response: [expectedActions]
    });
    store.dispatch(addRecipeAction(recipe, Materialize, history))
    expect(store.getActions()).toEqual(expectedActions);
  });

});