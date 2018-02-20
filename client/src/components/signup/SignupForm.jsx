import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/signupAction';
import vailidator from '../../helper/validator';

/**
 * 
 * @class SignupForm
 * 
 * @extends {Component}
 */
export class SignupForm extends Component {

  /**
   * @description Creates an instance of SignupForm.
   * 
   * @param {object} props 
   * 
   * @memberof SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @description Handles signup action
   * 
   * @param {object} event 
   * 
   * @return {undefined} No returned value
   * 
   * @memberof SignupForm
   */
  handleSignup(event) {
    event.preventDefault()
    const errors = vailidator.validateSignup(this.state);
    if (errors.length > 0) {
      errors.map(error => {
        Materialize.toast(error.message, 3000, 'red');
      });
      return;
    }

    this.props.signup(this.state, Materialize, this.props.history);
  }

  /**
   * @description Handles form field change 
   * 
   * @param {Object} event 
   * 
   * @return {undefined} No returned value
   * 
   * @memberof SignupForm
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * @description Renders the form to the page
   * 
   * @returns {object} Signup form jsx object
   * 
   * @memberof SignupForm
   */
  render() {
    return (
      <div className="row">
        <form
          id="signup"
          className="col s12 z-depth-2"
          style={{ padding: '50px' }}
          onSubmit={this.handleSignup}
        >
          <div className="row">
            <div className="input-field col s12 m6 l6">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="fname"
                name="firstName"
                value={this.state.firstName}
                type="text"
                className="validate"
                onChange={this.handleChange}
              />
              <label htmlFor="fname">First Name</label>
            </div>
            <div className="input-field col s12 m6 l6">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="lname"
                name="lastName"
                value={this.state.lastName}
                type="text"
                className="validate"
                onChange={this.handleChange}
              />
              <label htmlFor="lname">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m6 l6">
              <i className="material-icons prefix">email</i>
              <input
                id="email"
                name="email"
                value={this.state.email}
                type="text"
                className="validate"
                onChange={this.handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12 m6 l6">
              <i className="material-icons prefix">contact_phone</i>
              <input
                id="phone"
                name="phone"
                value={this.state.phone}
                type="text"
                className="validate"
                onChange={this.handleChange}
              />
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m6 l6">
              <i className="material-icons prefix">vpn_key</i>
              <input
                id="password"
                name="password"
                value={this.state.password}
                type="password"
                className="validate"
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s12 m6 l6">
              <i className="material-icons prefix">vpn_key</i>
              <input
                id="confirmPassword"
                name="confirmPassword"
                value={this.state.confirmPassword}
                type="password"
                className="validate"
                onChange={this.handleChange}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
          </div>
          <div className="row">
            <Link
              to="!#"
              id="signupBtn"
              role="button"
              tabIndex="0"
              onClick={this.handleSignup}
              className="waves-effect waves-light btn"
            >
              Sign Up
            </Link>
          </div>
          <div className="row">
            <p className="">Already have an account?
              {' '}<Link to="/signin"> Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  error: PropTypes.shape({}),
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

SignupForm.defaultProps = {
  error: {}
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);