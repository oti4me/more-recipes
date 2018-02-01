import { 
  USER_LOGIN, LOGIN_ERRORS, USER_LOGGEDIN, 
  USER_PROFILE, USER_SIGNUP, SIGNUP_ERRORS 
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload };

    case USER_SIGNUP:
      return { ...state, user: action.payload };

    case SIGNUP_ERRORS:
      return { ...state, ...action.payload };

    case LOGIN_ERRORS:
      return { ...state, error: action.payload };

    case USER_LOGGEDIN:
      return { ...state, ...action.payload };

    case USER_PROFILE:
      return { ...state, user: action.payload };
  }
  return state;
}

export default userReducer;