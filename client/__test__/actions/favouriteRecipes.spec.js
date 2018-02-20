import moxios from 'moxios';
import mockStore from '../mockData/mockStore';
import {
  addFavourite,
  getFavourites,
  checkFavourite,
  removeFavourite
} from '../../src/actions/favouritesAction';
import {
  ADD_FAVOURITE,
  ADD_FAVOURITE_ERRORS,
  REMOVE_FAVOURITE,
  REMOVE_FAVOURITE_ERRORS,
  IS_FAVOURITE_RECIPE
} from '../../src/actions/types';

const url = '/api/v1/users/';

const history = {
  push: () => { }
}

const recipe = {
  title: 'rice and beans',
  description: 'beans and yam',
  direction: 'this is a simple direction',
  ingredients: 'this is a simple ingredients',
  imageUrl: {}
}

describe('Favourite recipe suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should add a recipe as favourite', () => {
    const expectedActions = {
      favourites: {
        status: 201,
        message: ''
      }
    }
    moxios.stubRequest(`${url}/1/favourites/1`, {
      status: 201,
      response: { message: '' }
    });
    const store = mockStore({});
    store.dispatch(addFavourite({ userId: 1, recipeId: 1 }, Materialize))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Should get favourite recipes for a user', () => {
    const expectedActions = []
    moxios.stubRequest(`${url}/1/favourites?page=1`, {
      status: 200,
      response: {
        favouriteRecipes: [
          recipe
        ],
        pagination: {}
      }
    });
    const store = mockStore({});
    store.dispatch(getFavourites({ userId: 1, recipeId: 1 }, Materialize))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Should get favourite recipes for a user', () => {
    const expectedActions = []
    moxios.stubRequest(`${url}/1/favourites/1`, {
      status: 200,
      response: {
        favouriteRecipes: [
          recipe
        ],
        pagination: {}
      }
    });
    const store = mockStore({});
    store.dispatch(checkFavourite({ userId: 1, recipeId: 1 }, Materialize))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

});
