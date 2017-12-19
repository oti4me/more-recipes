// import isAuthenticated from './isAth.js';

import React, { Component } from 'react';
import { connect } from 'react-redux';

export const notAuth = (ComposedClass) => {
  class AuthenticationCheck extends Component {

    componentWillMount() {
      if (this.props.loggedIn) {
        this.props.history.push('/profile');
      }
    }

    render() {
      return <ComposedClass {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { loggedIn: state.auth.loggedIn };
  }

  return connect(mapStateToProps)(AuthenticationCheck)
}

const Auth = (ComposedClass) => {
  class AuthenticationCheck extends Component {

    componentWillMount() {
      if (!this.props.loggedIn) {
        this.props.history.push('/signin');
      }
    }

    render() {
      return <ComposedClass {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { loggedIn: state.auth.loggedIn };
  }

  return connect(mapStateToProps)(AuthenticationCheck)
}

export default Auth;