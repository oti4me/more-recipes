import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const updateUserState = (store) => {
  let token = window.localStorage.getItem('userToken');
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, (err, result) => {
      if (err) {
        window.localStorage.removeItem('userToken');
        store.dispatch({ type: 'USER_LOGGEDIN', payload: { loggedIn: false } });
      }
      else {
        store.dispatch({ type: 'USER_LOGGEDIN', payload: { loggedIn: true } });
        const user = jwt_decode(token);
        store.dispatch({ type: 'USER_LOGIN', payload: user });
      }
    });
  } else {
    store.dispatch({ type: 'USER_LOGGEDIN', payload: { loggedIn: false } });
  }
}

export default updateUserState;
