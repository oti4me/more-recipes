
import React, { Component } from 'react';
import { connect } from 'react-redux';

const notAuth = (ComposedClass) => {

  /**
   * @description A class that checks for user authentication
   *
   * @returns {object} JSX object
   * 
   * @class AuthenticationCheck
   * 
   * @extends {Component}
  */
  class AuthenticationCheck extends Component {

    /**
     * @description A life cycle function that checks if the user is logged in
     *
     * @returns {undfined} no return value
     * 
     * @memberof AuthenticationCheck
    */
    componentWillMount() {
      if (this.props.loggedIn) {
        this.props.history.push('/profile');
      }
    }

    /**
     * @description A method that returns jsx object to be displayed
     * 
     * @returns {object} JSX object
     * 
     * @memberof AuthenticationCheck
    */
    render() {
      return <ComposedClass {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return {
      loggedIn: state.auth.loggedIn
    };
  }
  return connect(mapStateToProps)(AuthenticationCheck)
}

export default notAuth;