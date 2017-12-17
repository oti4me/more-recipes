import axios from 'axios';
import { USER_LOGIN, USER_LOGGEDIN, LOGIN_ERRORS } from '../actions/types';

export const userSignin = (data) => {
  return {
    type: USER_LOGIN,
    payload: data
  }
};

export const userLogged = (data) => {
  return {
    type: USER_LOGGEDIN,
    payload: data
  }
};

export const loginError = (data) => {
  return {
    type: LOGIN_ERRORS,
    payload: data
  }
};


export const signin = (userData, callback) => {
  window.localStorage.removeItem('userToken');
  return dispatch => {
    dispatch(loginError(null));
    dispatch(userLogged({ loggedIn: false }));
    dispatch(userSignin({}));

    return axios.post('/api/v1/users/signin', { email: userData.email, password: userData.password })
      .then(res => {
        if (res) {
          dispatch(userLogged({ loggedIn: true }));
          dispatch(userSignin(res.data.user));
          window.localStorage.setItem('userToken', res.data.token);
          callback();
        }
      }).catch(error => {
        if (error.response.status === 400) {
          dispatch(loginError({ status: 400, message: error.response.data.message }));
          callback();
        } else if (error.response.status === 401) {
          dispatch(loginError({ status: 401, message: error.message }));
          callback();
        } else {
          dispatch(loginError({ status: 500, message: 'There seemed to be a problem signing you in, please try again later' }));
          callback();
        }
      });
  }
}

export const signOut = (history, dispatch) => {
  return dispatch => {
    window.localStorage.removeItem('userToken');
    dispatch(userSignin({}));
    dispatch(userLogged({ loggedIn: false }));
    history.push('/signin');
  }
}