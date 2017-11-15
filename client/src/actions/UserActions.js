import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const userSignin = (data) => {
  return {
    type : USER_LOGIN,
    payload : data
  }
};

export const requestSignin = (data) => {
  return {
    type : REQUEST_LOGIN,
    payload : data
  }
};

export const signin = (userData) =>{
   return dispatch => {
    dispatch(requestSignin(userData.email));
    axios.post('/api/v1/users/signin', { email : userData.email, password : userData.password })
    .then(res => {
      if(res){
        window.sessionStorage.token = res.data.token;
        dispatch(userSignin(res.data.user));
      }
    });
  }
}