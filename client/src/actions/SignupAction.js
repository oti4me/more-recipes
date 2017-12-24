import axios from 'axios';
import { USER_SIGNUP, REQUEST_SIGNUP, SIGNUP_ERRORS, USER_LOGGEDIN } from './types';

export const signupAction = (data) => {
  return {
    type: USER_SIGNUP,
    payload: data
  }
};

export const requestSignup = (data) => {
  return {
    type: REQUEST_SIGNUP,
    payload: data
  }
};

export const loggedIn = (data) => {
  return {
    type: USER_LOGGEDIN,
    payload: data
  }
};

export const signupError = (data) => {
  return {
    type: SIGNUP_ERRORS,
    payload: data
  }
};

export const signup = (userData, callback) => {
  return dispatch => {

    dispatch(requestSignup({ isRequesting: true }));
    dispatch(signupAction({ user: {} }));
    dispatch(loggedIn({ loggedIn: false }));
    dispatch(signupError({ error: {} }));

    const data = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      confirmPassword: userData.confirmPassword
    }

    return axios.post('/api/v1/users/signup', data)
      .then(res => {
        dispatch(requestSignup({ isRequesting: false }));
        if (res) {
          window.localStorage.setItem('userToken', res.data.token);
          dispatch(loggedIn({ loggedIn: true }));
          dispatch(signupAction(res.data.user));
          callback(false);
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          dispatch(requestSignup({ isRequesting: false }));
          dispatch(signupError({ user: {} }));
          callback(true);
        } else if (error.response.status === 401) {
          dispatch(requestSignup({ isRequesting: false }));
          dispatch(signupError({
            error: {
              status: 401,
              message: error.response.data.message
            }
          }));
          callback(true);
        } else if (error.response.status === 409) {
          dispatch(requestSignup({ isRequesting: false }));
          dispatch(signupError({
            error: {
              status: 409,
              message: error.response.data.message
            }
          }));
          callback(true);
        } else {
          dispatch(requestSignup({ isRequesting: false }));
          dispatch(signupError({
            error: {
              status: 500,
              message: error.response.data
            }
          }));
          callback(true);
        }
      });
  }
}