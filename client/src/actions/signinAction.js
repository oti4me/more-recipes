import axios from 'axios';
import { USER_LOGIN, USER_LOGGEDIN, LOGIN_ERRORS } from '../actions/types';

export const userSignin = (user) => {
  return {
    type: USER_LOGIN,
    payload: user
  }
};

export const userLogged = (isLoggedIn) => {
  return {
    type: USER_LOGGEDIN,
    payload: isLoggedIn
  }
};

export const signinError = (error) => {
  return {
    type: LOGIN_ERRORS,
    payload: error
  }
};


export const signin = (user, callback) => {
  window.localStorage.removeItem('userToken');
  return dispatch => {
    dispatch(signinError(null));
    dispatch(userLogged({ loggedIn: false }));
    dispatch(userSignin({}));
    const { email, password } = user;
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
          callback();
        }
      }).catch(error => {
        const { response: { status, data: { message } } } = error;
        if (error.response.status === 400) {
          dispatch(signinError({
            status,
            message
          }));
          callback();
        } else if (error.response.status === 401) {
          dispatch(signinError({
            status,
            message
          }));
          callback();
        } else {
          dispatch(signinError({
            status: 500,
            message: 'There seemed to be a problem signing you in, please try again later'
          }));
          callback();
        }
      });
  }
}

export const signOut = (history) => {
  return dispatch => {
    window.localStorage.removeItem('userToken');
    dispatch(userSignin({}));
    dispatch(userLogged({ loggedIn: false }));
    history.push('/signin');
  }
}