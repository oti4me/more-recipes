import React from 'react';
import ConnectedHeader, { Header } from '../../src/components/Header';
import store from '../../src/helper/store';
import mockStore from '../mockData/mockStore';

const mainState = store.getState();

const props = {
  loggedIn: false,
  signOut: jest.fn(),
  history: { push: jest.fn() }
}
const props2 = {
  loggedIn: true,
  signOut: jest.fn(),
  history: { push: jest.fn() }
}

const event = {
  target: {},
  preventDefault: jest.fn()
};

describe('Routes', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component without exploding', () => {
    const state = {
      ...mainState,
    };
    const newStore = mockStore(state);
    const wrapper = shallow(
      <ConnectedHeader store={newStore} {...props} />
    );
    expect(wrapper.length).toBe(1);
  });

  it('Should render component without exploding', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render component without exploding', () => {
    const wrapper = shallow(<Header {...props2} />);
    wrapper.find('#signOut').simulate('click', event);
    wrapper.instance().handleSignOut(event);
  });

});