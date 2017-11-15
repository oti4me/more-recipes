import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_FAILURE = 'LOGIN_FAILURE';

export const userSignin = (data) => {
  return {
    type : USER_LOGIN,
    payload : data
  }
};

export const signinFailed = (data) => {
  return {
    type : USER_LOGIN_FAILURE,
    payload : data
  }
};

export const signin = (userData, history, dispatch) =>{
   return dispatch => {
    dispatch({ type : 'USER_LOGGEDIN', payload : { loggedIn : true} });
    dispatch(userSignin({}));
    return axios.post('/api/v1/users/signin', { email : userData.email, password : userData.password })
    .then(res => {
      if(res){
        window.localStorage.setItem('userToken', res.data.token);
        dispatch(userSignin(res.data.user));
        dispatch({ type : 'USER_LOGGEDIN', payload : { loggedIn : true} });
        history.push('/profile');
      }
    });

    // .catch(error => {
    //   dispatch(userUsignin({ loggedIn : false, errors : error }));
    //   if(error.response.status === 400){
    //     console.log(error.response.data.errors);
    //   }else if(error.response.status === 401){
    //     console.log(error.response.data.errors);
    //   }else{
    //     console.log(error.response.data.errors);
    //   }
    // });
  }
  
}

export const signOut = (history, dispatch) => {
  return dispatch => {
    window.localStorage.removeItem('userToken');
    dispatch(userUsignin({}));
    dispatch({ type : 'USER_LOGGEDIN', payload : { loggedIn : false} });
    history.push('/signin');
  }
}