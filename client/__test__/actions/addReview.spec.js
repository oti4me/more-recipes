import moxios from 'moxios';
import addReview from '../../src/actions/addReview';
import mockStore from '../mockData/mockStore';
import {
  ADD_REVIEW,
  ADD_REVIEW_ERRORS
} from '../../src/actions/types';

const url = '/api/v1/recipes/';

describe('Review Action suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should add review to recpe with id 1', () => {
    const review = {
      comment: "this is a review",
      id: 1,
      userId: 2
    }
    moxios.stubRequest(`${url}1/reviews`, {
      status: 201,
      response: { review }
    });
    const expectedActions = [
      { type: ADD_REVIEW_ERRORS, payload: null },
      { type: ADD_REVIEW, payload: {} },
      { type: ADD_REVIEW, payload: { review } }
    ];
    const store = mockStore({});
    store.dispatch(addReview(review, () => { })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Should dispatch a 400 error if review comment is empty', () => {
    const review = {
      comment: '',
      id: 1,
      userId: 2
    }
    const errors = {
      status: 400,
      message: '',
    };
    moxios.stubRequest(`${url}1/reviews`, {
      status: 400,
      response: { message: '' }
    });
    const expectedActions = [
      { type: ADD_REVIEW_ERRORS, payload: null },
      { type: ADD_REVIEW, payload: {} },
      { type: ADD_REVIEW_ERRORS, payload: { errors } }
    ];
    const store = mockStore({});
    store.dispatch(addReview(review, () => { })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

});