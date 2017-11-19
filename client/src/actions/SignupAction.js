import axios from 'axios';

export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const PASSWORD_ERROR = 'PASSWORD_ERROR';

export const signupSuccess = (data) => {
  return {
    type : USER_SIGNUP_SUCCESS,
    payload : data
  }
};

export const signupFaild = (data) => {
  return {
    type : SIGNUP_FAILURE,
    payload : data
  }
};

export const requestSignup = (data) => {
  return {
    type : REQUEST_SIGNUP,
    payload : data
  }
};

export const passwordError = (data) => {
  return {
    type : PASSWORD_ERROR,
    payload : data
  }
};

export const signup = (userData, prop, Materialize) =>{
  return dispatch => {

    if(userData.password !== userData.confirmPassword){

    }

    dispatch(requestSignup(userData.email));

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
      if(res){
        window.localStorage.setItem('userToken', res.data.token);
        dispatch(signupSuccess({ loggedIn : true, user : res.data.user }));
        Materialize.toast("Registration Successful!!", 2000, 'green');
        prop.history.push('/profile');
      }
    })
    // .catch(error => {

    //   if(error.response.status === 400){
    //     // console.log(error.response.data.message);
    //     return error.response.data.message;
    //     console.log("still got here");
    //   }else if(error.response.status === 401){
    //     console.log("associated with login morron");
    //     return error.response.data.error
    //   }else if(error.response.status === 409){
    //     console.log("user with email already exist");
    //     return error.response.data.error
    //   }else{
    //     console.log("Internal erver error");
    //     return "Internal server error";
    //   }

    // });
  }
}