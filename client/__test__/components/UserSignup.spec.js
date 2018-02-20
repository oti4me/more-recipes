import React from 'react';
import toJson from 'enzyme-to-json';
// import ConnectedSignupPage, { SignupPage } from '../../src/components/signup/SignupPage';
import SignupPage from '../../src/components/signup/SignupPage';
// import SignupPage from '../../src/components/signup/SignupPage';
import { mountWrapper } from '../utils';
import mockStore from '../mockData/mockStore';
import store from '../../src/helper/createStore';

const mainState = store.getState();
const props = {
  history: {
    push: () => { },
  }
};

const userInfo = {
  firstName: 'Henry',
  lastName: 'Otighe',
  email: 'otighe@gmail.com',
  phone: '07067143161',
  password: 'Oti4me@gmail.com',
  confirmPassword: 'Oti4me@gmail.com'
}

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

const newStore = mockStore(newState);
const wrapper = mountWrapper(SignupPage, newStore, props);
const SignupFormWrapper = wrapper.find('SignupForm');

describe('Sign-Up Component Suite', () => {
  it('should render SignupPage correctly without exploding', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should handles onChange action on form fields', () => {
    SignupFormWrapper.instance()
      .handleChange(event('firstName', userInfo.firstName));
    SignupFormWrapper.instance()
      .handleChange(event('lastName', userInfo.lastName));
    SignupFormWrapper.instance()
      .handleChange(event('email', userInfo.email));
    SignupFormWrapper.instance()
      .handleChange(event('phone', userInfo.phone));
    SignupFormWrapper.instance()
      .handleChange(event('password', userInfo.password));
    SignupFormWrapper.instance()
      .handleChange(event('confirmPassword', userInfo.confirmPassword));
    expect(SignupFormWrapper.instance().state)
      .toEqual(userInfo);
  });
});

SignupFormWrapper.find('a').at(0).simulate('click', {
  preventDefault: jest.fn(),
});


// const state = {
//   email: "",
//   password: ""
// };

// const func = jest.fn();
// const props = {
//   loggedIn: true,
//   error: {},
//   history: {
//     push: jest.fn()
//   },
//   signup: jest.fn()
// };
// const signin = jest.fn()

// const errorProps = {
//   loggedIn: true,
//   error: {
//     status: 400,
//     message: [
//       'username cannot be empty'
//     ]
//   },
//   signin: jest.fn()
// };

// const event = {
//   target: {
//     name: 'firstName',
//     value: 'Henry'
//   },
//   preventDefault: jest.fn()
// };

// describe('Signup test suit', () => {

//   it('Should render SignupForm component without exploding', () => {
//     const wrapper = shallow(<SignupForm {...props} />);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('Should render Signup connected component without exploding', () => {
//     const wrapper = shallow(
//       <ConnectedSignupForm store={store} {...props} />
//     );
//     expect(wrapper.length).toBe(1);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('Should handle field change', () => {
//     const wrapper = shallow(
//       <SignupForm {...props} {...state} />
//     );
//     const spy = jest.spyOn(wrapper.instance(), 'handleSignup');
//     // wrapper.instance().handleChange(event);
//     wrapper.instance().handleSignup(event);
//     wrapper.setState({
//       firstName: 'Monkey',
//       lastName: 'Homoerectus',
//       email: 'me@gmail.com',
//       password: 'Abcd.123.@',
//       confirmPassword: 'Abcd.123.@',
//       phone: '07033333333'
//     });
//     wrapper.find('#signup').simulate('submit', event);
//     expect(spy).toHaveBeenCalled();
//     expect(wrapper.instance().props.signup).toHaveBeenCalled();
//   });


//   it('Should handle field change', () => {
//     const wrapper = shallow(
//       <SignupForm {...props} {...state} />
//     );
//     const spy = jest.spyOn(wrapper.instance(), 'handleChange');
//     wrapper.instance().handleChange(event);
//     wrapper.find('#fname').simulate('change', event);
//     expect(spy).toHaveBeenCalled();
//     expect(wrapper.instance().state.firstName).toEqual('Henry');
//   });

//   it('Should handle field change', () => {
//     const wrapper = shallow(
//       <ConnectedSignupPage store={store} {...props} {...state} />
//     );
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('Should render SignupPage correctly', () => {
//     const wrapper = shallow(
//       <SignupPage {...props} {...state} />
//     );
//     expect(wrapper).toMatchSnapshot();
//   });
// });
