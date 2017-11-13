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
  recipes : null,
  auth : null
}

// const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      { Routes }
    </BrowserRouter>
  </Provider>
  // <h1>hello there</h1>
    , document.getElementById('app')
);  