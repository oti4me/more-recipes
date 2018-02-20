import React from 'react';
import toJson from 'enzyme-to-json';
import FavouritePage
  from '../../src/components/favourites/FavouritePage';
import { mountWrapper } from '../utils';
import mockStore from '../mockData/mockStore';
import store from '../../src/helper/store';
import recipeMock from '../mockData/recipeMock';

const mainState = store.getState();
const props = {
  history: {
    push: () => { },
  }
};
const recipeId = 20;
const recipe = recipeMock.favoriteRecipeMock;
const favourites = [
  { ...recipe, id: recipeId }
];
const newState = {
  ...mainState,
  getFavourites: jest.fn(() => Promise.resolve()),
  auth: {
    user: {
      userId: 3,
    },
    loggedIn: true,
  }
};

const newStore = mockStore(newState);
const wrapper = mountWrapper(FavouritePage, newStore, props);
const favouriteListWrapper = wrapper.find('FavouriteRecipesList');

describe('Favourite component suite', () => {

  it('should render correctly without exploding', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should hadle buttons', () => {
    favouriteListWrapper.instance()
      .componentWillReceiveProps({
        favourites,
      });
    expect(favouriteListWrapper.instance().state.favourites)
      .toEqual(favourites);
    favouriteListWrapper.find('a').at(0).simulate('click', {
      preventDefault: jest.fn(),
    });
    favouriteListWrapper.find('a').at(1).simulate('click', {
      preventDefault: jest.fn(),
    });
  });
});
