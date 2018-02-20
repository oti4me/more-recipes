import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import store from '../src/helper/createStore';

export const mountWrapper = (Component, store, props) => mount(
  <Provider store={store} >
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  </Provider>
);

export const mainState = store.getState();

export default {
  mountWrapper,
}