import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

// initial state of the app
const initialState = {
  recipes: {},
  auth: {
    user: {},
    loggedIn: false,
  }
};

// create store to save app state
const store = createStore(reducers, initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;