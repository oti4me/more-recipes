import moxios from 'moxios';
import {
  signup
} from '../../src/actions/signupAction';
import {
  USER_SIGNUP,
  SIGNUP_ERRORS,
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

describe('Should signup a user', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should successfully signup a user', () => {
    const expectedActions = [{ type: 'REQUEST_SIGNUP', payload: { isRequesting: true } },
    { type: 'USER_SIGNUP', payload: { user: {} } },
    { type: 'USER_LOGGEDIN', payload: { loggedIn: false } },
    { type: 'SIGNUP_ERRORS', payload: { error: {} } },
    { type: 'REQUEST_SIGNUP', payload: { isRequesting: false } },
    { type: 'USER_LOGGEDIN', payload: { loggedIn: true } },
    {
      type: 'USER_SIGNUP',
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

    moxios.stubRequest(`${url}signup`, {
      status: 200,
      response: {
        token: 'bfjsnfnfjksdnfjkadnbkjfndskfnjdjnk',
        user
      }
    });
    store.dispatch(signup({
      email: 'oti4me@gmail.com',
      password: 'Oti4me@gmail',
      firstName: 'HEnry',
      lastName: 'Otighe',
      phone: '',
      imageUrl: ''
    }, Materialize, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });


  it('Should return a 400 error on error validating user details',
    () => {
      const expectedActions = {
        payload: {
          "isRequesting": true
        },
        type: "REQUEST_SIGNUP"
      }

      moxios.stubRequest(`${url}signup`, {
        status: 400,
        response: {
          message: [{ msg: 'bfjsnfnfjksdnfjkadnbkjfndskfnjdjnk' }],
        }
      });
      store.dispatch(signup({
        email: 'oti4me@gmail.com',
        password: 'Oti4me@gmail',
        firstName: 'HEnry',
        lastName: 'Otighe',
        phone: '',
        imageUrl: ''
      }, Materialize, history))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        })
    });

  it('Should return a 409 error on duplicate email', () => {
    const expectedActions = {
      payload: {
        isRequesting: true
      }, type: "REQUEST_SIGNUP"
    }

    moxios.stubRequest(`${url}signup`, {
      status: 409,
      response: {
        message: 'bfjsnfnfjksdnfjkadnbkjfndskfnjdjnk',
      }
    });
    store.dispatch(signup({
      email: 'oti4me@gmail.com',
      password: 'Oti4me@gmail',
      firstName: 'HEnry',
      lastName: 'Otighe',
      phone: '',
      imageUrl: ''
    }, Materialize, history))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      })
  });

  it('Should handle other errors', () => {
    const expectedActions = {
      payload: {
        isRequesting: true
      }, type: "REQUEST_SIGNUP"
    }

    moxios.stubRequest(`${url}signup`, {
      status: 500,
      response: {
        message: 'bfjsnfnfjksdnfjkadnbkjfndskfnjdjnk',
      }
    });
    store.dispatch(signup({
      email: 'oti4me@gmail.com',
      password: 'Oti4me@gmail',
      firstName: 'HEnry',
      lastName: 'Otighe',
      phone: '',
      imageUrl: ''
    }, Materialize, history))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      })
  });

});
