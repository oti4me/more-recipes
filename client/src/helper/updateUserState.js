import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

const validateUser =  (store)=>{
  let token = window.localStorage.getItem('userToken');
  if(token){
    jwt.verify(token, 'oti4me@gmail.com', (err, result) => {
      if (err) {
        window.localStorage.removeItem('userToken');
        store.dispatch({ type : 'USER_LOGGEDIN', payload : { loggedIn : false} });
      }
      else {
        store.dispatch({ type : 'USER_LOGGEDIN', payload : { loggedIn : true} });
        const user = jwt_decode(token);
        store.dispatch({ type : 'USER_LOGIN', payload : user });
      }
    });
  }else{
    store.dispatch({ type : 'USER_LOGGEDIN', payload : { loggedIn : false} });
  }
}

export default validateUser;
