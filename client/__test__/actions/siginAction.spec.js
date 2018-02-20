import moxios from 'moxios';
import mockStore from '../mockData/mockStore';
import {
  signin,
  signOut
} from '../../src/actions/signinAction';
import {
  USER_LOGGEDIN,
  LOGIN_ERRORS,
  USER_LOGIN
} from '../../src/actions/types';

const url = '/api/v1/users/';
const user = {
  firstName: 'Henry',
  lastName: 'Otighe',
  email: 'oti4me@gmail.com',
  phone: '070424235343',
  image: 'profile.jpg',
  userId: '1'
}
const history = {
  push: () => { }
}

describe('Signin Suite', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should Singin a registered user', () => {
    const expectedActions = [{ type: 'LOGIN_ERRORS', payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} },
    { type: USER_LOGGEDIN, payload: { loggedIn: true } },
    {
      type: USER_LOGIN,
      payload:
        {
          firstName: 'Henry',
          lastName: 'Otighe',
          email: 'oti4me@gmail.com',
          phone: '070424235343',
          image: 'profile.jpg',
          userId: '1'
        }
    }];

    moxios.stubRequest(`${url}signin`, {
      status: 200,
      response: {
        token: 'bfjsnfnfjksdnfjkadnbkjfndskfnjdjnk',
        user
      }
    });
    store.dispatch(signin({
      email: 'oti4me@gmail.com',
      password: 'Oti4me@gmail'
    }, Materialize, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

  it('should return a 400 error if user detail is invalid', () => {
    const expectedActions = [{ type: 'LOGIN_ERRORS', payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} },
    { type: USER_LOGGEDIN, payload: { loggedIn: true } },
    {
      type: USER_LOGIN,
      payload:
        {
          firstName: 'Henry',
          lastName: 'Otighe',
          email: 'oti4me@gmail.com',
          phone: '070424235343',
          image: 'profile.jpg',
          userId: '1'
        }
    },
    { type: LOGIN_ERRORS, payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} }]

    moxios.stubRequest(`${url}signin`, {
      status: 400,
      response: {
        message: ['bfjsnfnfjksdnfjkadnbkjfndskfnjdjnk'],
      }
    });
    store.dispatch(signin({
      email: 'oti4me@gmail.com',
      password: 'Oti4me@gmail'
    }, Materialize, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

  it('Should return a 401 error if the user has not registered', () => {
    const expectedActions = [{ type: 'LOGIN_ERRORS', payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} },
    { type: USER_LOGGEDIN, payload: { loggedIn: true } },
    {
      type: USER_LOGIN,
      payload:
        {
          firstName: 'Henry',
          lastName: 'Otighe',
          email: 'oti4me@gmail.com',
          phone: '070424235343',
          image: 'profile.jpg',
          userId: '1'
        }
    },
    { type: LOGIN_ERRORS, payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} },
    { type: LOGIN_ERRORS, payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} }]

    moxios.stubRequest(`${url}signin`, {
      status: 401,
      response: {
        message: 'bfjsnfnfjksdnfjkadnbkjfndskfnjdjnk',
      }
    });
    store.dispatch(signin({
      email: 'oti4me@gmail.com',
      password: 'Oti4me@gmail'
    }, Materialize, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

  it('Should handle all uncaught errors', () => {
    const expectedActions = [{ type: 'LOGIN_ERRORS', payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} },
    { type: USER_LOGGEDIN, payload: { loggedIn: true } },
    {
      type: USER_LOGIN,
      payload:
        {
          firstName: 'Henry',
          lastName: 'Otighe',
          email: 'oti4me@gmail.com',
          phone: '070424235343',
          image: 'profile.jpg',
          userId: '1'
        }
    },
    { type: LOGIN_ERRORS, payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} },
    { type: LOGIN_ERRORS, payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} },
    { type: LOGIN_ERRORS, payload: null },
    { type: USER_LOGGEDIN, payload: { loggedIn: false } },
    { type: USER_LOGIN, payload: {} }]

    moxios.stubRequest(`${url}signin`, {
      status: 500,
      response: {
        message: 'bfjsnfnfjksdnfjkadnbkjfndskfnjdjnk',
      }
    });
    store.dispatch(signin({
      email: 'oti4me@gmail.com',
      password: 'Oti4me@gmail'
    }, Materialize, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

  it('should dispatch logout action', () => {
    const store = mockStore({});
    const expected = [{
      payload: {},
      type: USER_LOGIN
    }, {
      payload: {
        loggedIn: false
      }, type: USER_LOGGEDIN
    }];
    store.dispatch(signOut(history))
    expect(store.getActions()).toEqual(expected)
  });

});
