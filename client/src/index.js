import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,  Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

import Routes from './routes';
import reducers from './reducers';

const initialState = {
  recipes : {},
  auth : { user :{}, loggedIn : false } 
}

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

let token = window.localStorage.getItem('userToken');

if(token){
  jwt.verify(token, 'oti4me@gmail.com', (err, result) => {
    if (err) {
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

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      { Routes }
    </BrowserRouter>
  </Provider>
    , document.getElementById('app')
);  