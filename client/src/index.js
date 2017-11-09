import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,  Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

ReactDOM.render(
  <h1>Hi!</h1>
  , document.getElementById('app')
);  