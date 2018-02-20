import moxios from 'moxios';
import { upvoteRecipe, downVoteRecipe } from '../../src/actions/votesAction';
import mockStore from '../mockData/mockStore';
import {
  UPVOTE_RECIPE,
  UPVOTE_RECIPE_ERRORS,
  DOWNVOTE_RECIPE_ERRORS,
  DOWNVOTE_RECIPE
} from '../../src/actions/types';

const url = '/api/v1/recipes/';

describe('Votes Suite', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  it('Should upvote a recipe', () => {
    const expectedActions = [
      { type: UPVOTE_RECIPE_ERRORS, payload: null },
      { type: UPVOTE_RECIPE, payload: {} },
      { type: UPVOTE_RECIPE, payload: { message: '', recipe: {} } }
    ];

    moxios.stubRequest(`${url}1/upvotes`, {
      status: 200,
      response: {
        message: '',
        recipe: {}
      }
    });
    const store = mockStore({})
    store.dispatch(upvoteRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Return 404 error if no recipe is found with provided ID',
    () => {
      const message = ''
      const expectedActions = [{
        payload: null,
        type: UPVOTE_RECIPE_ERRORS
      }, {
        payload: {},
        type: UPVOTE_RECIPE
      }, {
        payload: {
          errors: {
            message: "",
            status: 404
          }
        },
        type: UPVOTE_RECIPE_ERRORS
      }];

      moxios.stubRequest(`${url}1/upvotes`, {
        status: 404,
        response: {
          message: message
        }
      });
      store.dispatch(upvoteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
    });

  it('Should return downvote a recipe',
    () => {
      const message = ''
      const expectedActions = [
        { type: DOWNVOTE_RECIPE_ERRORS, payload: null },
        { type: DOWNVOTE_RECIPE, payload: {} },
        {
          type: DOWNVOTE_RECIPE, payload: { message: '', recipe: undefined }
        }
      ]

      moxios.stubRequest(`${url}1/downvotes`, {
        status: 200,
        response: {
          message: message
        }
      });
      const store = mockStore({})
      store.dispatch(downVoteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
    });
});
