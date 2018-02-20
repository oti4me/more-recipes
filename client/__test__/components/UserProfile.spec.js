import React from 'react';
import UserProfileDetails from '../../src/components/users/UserProfileDetails';
import ConnectedUserProfilePage, { UserProfilePage } from '../../src/components/users/UserProfilePage';

const props = {
  loggedIn: true,
  error: {},
  history: {},
  user: {}
};

describe('User profile page suit', () => {

  it('Should render update recipe page component without exploding', () => {
    const wrapper = shallow(<UserProfilePage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render update recipe component without exploding', () => {
    const wrapper = shallow(<ConnectedUserProfilePage store={store} {...props} />);
    expect(wrapper.length).toBe(1);
  });

});

describe('User profile details suit', () => {

  it('Should render Update recipe page component without exploding', () => {
    const wrapper = shallow(<UserProfileDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

});
