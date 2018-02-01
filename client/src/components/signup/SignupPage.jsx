import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import Footer from '../Footer';
import Header from '../Header';

/**
 * 
 * 
 * @class SignupPage
 * 
 * @extends {Component}
 */
class SignupPage extends Component {

  /**
   * Creates an instance of SignupPage.
   * 
   * @param {object} props 
   * 
   * @memberof SignupPage
   */
  constructor(props) {
    super(props);
  }

  /**
   * A method that renders the jsx component to the browser
   * 
   * @returns {object} Sign up jsx object
   * 
   * @memberof SignupPage
   */
  render() {
    return (
      <div className="main">
        <Header {...this.props} />
        <div className="container cont">
          <div className="row">
            <div className="col s12  s2 m8 l8 offset-m2 offset-l2">
              <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
              <SignupForm history={this.props.history} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({}).isRequired
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps)(SignupPage);
