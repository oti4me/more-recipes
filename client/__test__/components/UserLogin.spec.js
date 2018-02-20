import React from 'react';
import toJson from 'enzyme-to-json';
import SigninPage from '../../src/components/signin/SigninPage';
import { mountWrapper } from '../utils';
import mockStore from '../mockData/mockStore';
import store from '../../src/helper/store';

const mainState = store.getState();
const props = {
  history: {
    push: () => { },
  }
};

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

const event = (name, value) => ({
  preventDefault: jest.fn(),
  target: {
    name,
    value
  }
});

const userInfo = {
  email: 'otighe@gmail.com',
  password: 'Oti4me@gmail.com'
}

const newStore = mockStore(newState);
const wrapper = mountWrapper(SigninPage, newStore, props);
const SigninFormFormWrapper = wrapper.find('SigninForm');

describe('Sign-Up Component Suite', () => {
  it('should render SignupPage correctly without exploding', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render SignupPage correctly without exploding', () => {
    SigninFormFormWrapper.instance()
      .handleChange(event('email', userInfo.email));
    SigninFormFormWrapper.instance()
      .handleChange(event('password', userInfo.password));
  });

  it('should render SignupPage correctly without exploding', () => {
    SigninFormFormWrapper.find('a').at(0).simulate('click', {
      preventDefault: jest.fn(),
    });
  });

});
