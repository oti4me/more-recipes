import moxios from 'moxios';
import { getReviews } from '../../src/actions/getReviews';
import {
  GET_REVIEWS,
} from '../../src/actions/types';

const url = '/api/v1/recipes/';

describe('Recipe review suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should get all reviews for a recipe', () => {
    const expectedActions = {
      type: GET_REVIEWS,
      payload: { reviews: undefined }
    }
    moxios.stubRequest(`${url}1/reviews`, {
      status: 200,
      response: []
    });
    store.dispatch(getReviews(1))
      .then(() => {
        expect(store.getActions()[2]).toEqual(expectedActions);
      })
  });

});
