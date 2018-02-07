import axios from 'axios';
import {
  USER_SIGNUP,
  REQUEST_SIGNUP,
  SIGNUP_ERRORS,
  USER_LOGGEDIN
} from './types';

export const signupAction = (user) => {
  return {
    type: USER_SIGNUP,
    payload: user
  }
};

export const requestSignup = (isRequesting) => {
  return {
    type: REQUEST_SIGNUP,
    payload: isRequesting
  }
};

export const loggedIn = (isLoggedIn) => {
  return {
    type: USER_LOGGEDIN,
    payload: isLoggedIn
  }
};

export const signupError = (errors) => {
  return {
    type: SIGNUP_ERRORS,
    payload: errors
  }
};

export const signup = (userDetails, callback) => {
  return dispatch => {
    dispatch(requestSignup({ isRequesting: true }));
    dispatch(signupAction({ user: {} }));
    dispatch(loggedIn({ loggedIn: false }));
    dispatch(signupError({ error: {} }));

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    } = userDetails

    const user = {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    }

    return axios.post('/api/v1/users/signup', user)
      .then(response => {
        dispatch(requestSignup({ isRequesting: false }));
        if (response) {
          const { data: { token, user } } = response;
          window.localStorage.setItem('userToken', token);
          dispatch(loggedIn({ loggedIn: true }));
          dispatch(signupAction(user));
          callback(false);
        }
      })
      .catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(requestSignup({ isRequesting: false }));
        dispatch(signupError({
          error: {
            status,
            message
          }
        }));
        callback(true);
      });
  }
};