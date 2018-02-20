import userReducer from '../../src/reducers/userReducer';
import userMock from '../mockData/userMock';
import {
  USER_SIGNUP, SIGNUP_ERRORS, REQUEST_SIGNUP,
  USER_LOGIN
} from '../../src/actions/types';

const {
  userLoginDetails,
  userSignupDetails,
} = userMock;

const state = {}

const userLogin = {
  type: USER_LOGIN,
  payload: userLoginDetails
}

const userSignup = {
  type: USER_SIGNUP,
  payload: userSignupDetails
}

const userSignupError = {
  type: USER_SIGNUP,
  payload: {
    error: {
      message: 'error'
    },
  }
}

describe('Singin reducer test', () => {

  it('should return a default state', () => {
    expect(userReducer(undefined, { type: 'nonexisting' })).toEqual({});
  });

  it('should signin the user', () => {
    expect(userReducer(state, userLogin)).toEqual({
      ...state, user: userLogin.payload
    });
  });



  it('should flag signin errors', () => {
    expect(userReducer(state, userSignupError)).toEqual({
      user: {
        error: {
          message: 'error'
        }
      }
    });
  });

  it('should signup the user', () => {
    const expextedValue = userReducer(state, userSignup);
    expect(expextedValue).toEqual({
      ...state, user: userSignup.payload
    });
  });

});