import React from 'react';
import $ from 'jquery';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, render, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

// create any initial state needed
Enzyme.configure({ adapter: new Adapter() });
const initialState = {
  auth: {
    user: {}
  },
  recipes: {}
};

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const store = mockStore(initialState)
const localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn()
}

const history = {
  push: jest.fn()
}

process.env.NODE_ENV = 'test';


global.shallow = shallow;
global.Materialize = {
  toast: jest.fn()
};

global.render = render;
global.history = history;
global.mount = mount;
global.store = store;
global.fetchMock = fetchMock;
global.localStorage = localStorage;
global.$ = $;
global.jQuery = $;
$.prototype.dropdown = () => { };
$.prototype.sideNav = () => { };
$.prototype.carousel = () => { };
$.prototype.modal = () => { };
$.prototype.tooltip = () => { };
$.prototype.materialbox = () => { };
$.prototype.tabs = () => { };
