import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import updateUserState from './helper/updateUserState';
import Routes from './Routes';
import store from './helper/createStore';
import '../public/css/style.scss';

// update current user to true if logged in or false if user is not logged in
updateUserState(store);

// render the app to the page
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
  , document.getElementById('app')
);  
