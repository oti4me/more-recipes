import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/SignupAction.js';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignup(e) {
    e.preventDefault()
    this.props.signup(this.state, (isError) => {
      const { error } = this.props;
      if (isError) {
        if (error.status === 400) {
          error.message.map(err => {
            return Materialize.toast(err.msg, 5000, 'red');
          });
        } else if (error.status === 401) {
          return Materialize.toast(error.message, 5000, 'red');
        } else if (error.status === 409) {
          return Materialize.toast(error.message, 5000, 'red');
        } else {
          return Materialize.toast("Error Sigin up, please try again later", 5000, 'red');
        }
      }
      else {
        Materialize.toast('Account created successfully', 5000, 'green');
        this.props.history.push('/profile');
      }
    })
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSignup}>
          <div className="row">
            <div className="input-field col s12">
              <input id="fname" name="firstname" value={this.state.firstname} type="text" className="validate" onChange={this.handleChange} />
              <label htmlFor="fname">First Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="lname" name="lastname" value={this.state.lastname} type="text" className="validate" onChange={this.handleChange} />
              <label htmlFor="lname">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" name="email" value={this.state.email} type="text" className="validate" onChange={this.handleChange} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="phone" name="phone" value={this.state.phone} type="text" className="validate" onChange={this.handleChange} />
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" name="password" value={this.state.password} type="password" className="validate" onChange={this.handleChange} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} type="password" className="validate" onChange={this.handleChange} />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
          </div>
          <div className="row">
            <a onClick={this.handleSignup} className="waves-effect waves-light btn">Sign In</a>
          </div>
          <div className="row">
            <p className="">Already have an account?
              <a href="/signin">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  loggedIn: PropTypes.bool,
  error: PropTypes.object,
  signin: PropTypes.func,
};


function mapStateToProps(state) {
  return {
    loggedIn: state.auth.loddedIn,
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);