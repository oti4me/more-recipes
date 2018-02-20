import axios from 'axios';
import { USER_LOGIN, USER_LOGGEDIN, LOGIN_ERRORS } from '../actions/types';

/**
 * @description A function to dispatch an action on user sigin success
 * 
 * @param {object} user user object
 * 
 * @return {Object} action dispatch by the action creator
 */
export const userSignin = (user) => {
  return {
    type: USER_LOGIN,
    payload: user
  }
};

/**
 * @description A function to dispatch an action on user loggedIn
 * 
 * @param {boolean} isLoggedIn
 * 
 * @return {Object} action dispatch by the action creator
 */
export const userLogged = (isLoggedIn) => {
  return {
    type: USER_LOGGEDIN,
    payload: isLoggedIn
  }
};

/**
 * @description A function to dispatch an action on user signin error
 * 
 * @param {array} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signinError = (error) => {
  return {
    type: LOGIN_ERRORS,
    payload: error
  }
};

/**
 * @description A function to signin a user
 * 
 * @param {object} userInfo
 * @param {object} Materialize
 * @param {object} history
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signin = (userInfo, Materialize, history) => {
  window.localStorage.removeItem('userToken');
  return dispatch => {
    dispatch(signinError(null));
    dispatch(userLogged({ loggedIn: false }));
    dispatch(userSignin({}));
    const { email, password } = userInfo;
    return axios.post('/api/v1/users/signin', {
      email,
      password
    })
      .then(response => {
        if (response) {
          const { data: { user, token } } = response;
          dispatch(userLogged({ loggedIn: true }));
          dispatch(userSignin(user));
          window.localStorage.setItem('userToken', token);
          history.push('/profile');
        }
      }).catch(error => {
        const { response: { status, data: { message } } } = error;
        if (status === 400) {
          message.map(err => {
            Materialize.toast(err.msg, 4000, 'red');
          });
        } else if (status === 401) {
          Materialize.toast('Email or password incorrect', 4000, 'red');
        } else {
          Materialize.toast(error, 4000);
        }
      });
  }
}

/**
 * @description A function to logout a user
 * 
 * @param {object} history
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signOut = (history) => {
  return dispatch => {
    window.localStorage.removeItem('userToken');
    dispatch(userSignin({}));
    dispatch(userLogged({ loggedIn: false }));
    history.push('/signin');
  }
}