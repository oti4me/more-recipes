// import isAuthenticated from './isAth.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import store from './createStore';
import updateUserState from './updateUserState';

/**
  * @description  A function that checks for user authentication
  * 
  * @param {object} ComposedClass object
  *
  * @returns {object} ComposedClass AuthenticationCheck object
*/
const Auth = (ComposedClass) => {

  /**
   * 
   * @class AuthenticationCheck
   * 
   * @extends {Component}
   */
  class AuthenticationCheck extends Component {

    /**
      * @description A life cycle function that checks if the user is logged in
      * 
      * @returns {undefined}
      * 
      * @memberof AuthenticationCheck
     */
    componentDidMount() {
      if (!this.props.loggedIn) {
        this.props.history.push('/signin');
      }
    }

    /**
     * @description A method that returns jsx object to be displayed
     * 
     * @returns {object} JSX composed class object
     * 
     * @memberof AuthenticationCheck
    */
    render() {
      return <ComposedClass {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return { loggedIn: state.auth.loggedIn };
  }
  return connect(mapStateToProps)(AuthenticationCheck)
}

export default Auth;