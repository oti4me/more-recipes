import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,  Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import updateUserState from './helper/updateUserState';
import Routes from './routes';
import reducers from './reducers';

const initialState = {
  recipes : {},
  auth : { user :{}, 
    loggedIn : false 
  } 
}

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

updateUserState(store);

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      { Routes }
    </BrowserRouter>
  </Provider>
    , document.getElementById('app')
);  