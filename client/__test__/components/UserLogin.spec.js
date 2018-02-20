import React from 'react';
import toJson from 'enzyme-to-json';
// import ConnectedSignupForm, { SignupForm } from '../../src/components/signup/SignupForm';
// import ConnectedSignupPage, { SignupPage } from '../../src/components/signup/SignupPage';
import SigninPage from '../../src/components/signin/SigninPage';
import { mountWrapper } from '../utils';
import mockStore from '../mockData/mockStore';
import store from '../../src/helper/createStore';

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

  // it('should hadle buttons', () => {
  //   SignupFormWrapper.instance()
  //     .handleChange({
  //       name: 'firstName',
  //       value: 'Henry'
  //     }, event);

  //   SignupFormWrapper.instance.setState(userInfo);
  //   expect(favouriteListWrapper.instance().state)
  //     .toEqual(userInfo);
  //   favouriteListWrapper.find('a').at(0).simulate('click', {
  //     preventDefault: jest.fn(),
  //   });
  //   favouriteListWrapper.find('a').at(1).simulate('click', {
  //     preventDefault: jest.fn(),
  //   });
  // });
});


// import React from 'react';
// import SigninForm2, { SigninForm } from '../../src/components/signin/SigninForm';
// import SigninPage from '../../src/components/signin/SigninPage';


// const state = {
//   email: "",
//   password: ""
// };

// const func = jest.fn();
// const props = {
//   loggedIn: true,
//   error: {},
//   history: {},
//   signin: jest.fn()
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
// describe('Should handle change', () => {

//   it('Should render component without exploding', () => {
//     const wrapper = shallow(<SigninForm {...props} />);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('Should render component without exploding', () => {
//     const wrapper = shallow(<SigninForm2 store={store} {...props} />);
//     expect(wrapper.length).toBe(1);
//   });


//   it('Should handle field change', () => {
//     const wrapper = shallow(<SigninForm signin={signin} {...props} {...state} />);
//     wrapper.instance().handleChange(event);
//     wrapper.instance().handleSignin(event);
//     wrapper.find('#form').simulate('submit', event);
//     expect(props.signin.mock.calls.length).toBe(1)
//   });
//   it('Should handle signin button clicked', () => {
//     const wrapper = shallow(<SigninForm signin={signin} {...props} {...state} />);
//     wrapper.find('#signin').simulate('click', event);
//     expect(props.signin.mock.calls.length).toBe(2);
//   });
// });

// describe('Signin page suit', () => {
//   it('Should render signin page without exploding', () => {
//     const wrapper = shallow(<SigninPage {...props} />);
//     expect(wrapper).toMatchSnapshot();
//   });
// });