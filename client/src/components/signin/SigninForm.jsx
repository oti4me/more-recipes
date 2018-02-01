import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signin } from '../../actions/signinAction';

/**
 * @description A class to create signin form object
 * 
 * @class SigninForm
 * 
 * @extends {Component}
 */
class SigninForm extends Component {

  /**
   * @description Creates an instance of SigninForm.
   * 
   * @param {object} props 
   * 
   * @memberof SigninForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  /**
   * @description Handles signin action
   * 
   * @param {object} event event object
   * 
   * @return {undefined} No retruned type
   * 
   * @memberof SigninForm
   */
  handleSignin(event) {
    event.preventDefault();
    this.props.signin(this.state, () => {
      const { error } = this.props;
      if (error) {
        if (error.status === 400) {
          error.message.map(err => {
            Materialize.toast(err.msg, 4000, 'red');
          });
        } else if (error.status === 401) {
          Materialize.toast('Email or password incorrect', 4000, 'red');
        } else {
          Materialize.toast(error, 4000);
        }
      }
      else {
        this.props.history.push('/profile');
      }
    })
  }

  /**
   * @description Handles field change event
   * 
   * @param {object} event event object
   * 
   * @return {undefined} No returned type
   * 
   * @memberof SigninForm
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * @description renders signin for to the dom
   * 
   * @returns {object} Signin form jsx object
   * 
   * @memberof SigninForm
   */
  render() {
    return (
      <div className="row">
        <form className="col s12 z-depth-2" style={{ padding: '50px' }}>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input
                id="email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <a
              role="button"
              tabIndex="0"
              className="waves-effect waves-light btn"
              onClick={this.handleSignin}
            >
              Sign In
            </a>
          </div>
          <div className="row">
            <p className="">
              Dont have an account?
              <a href="/signup"> Sign Up</a>
              <br />Forget Password? click
              <a href="forget_password.html">Here</a>
            </p>
          </div>
        </form>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.auth.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);