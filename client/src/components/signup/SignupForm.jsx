import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signup } from '../../actions/SignupAction.js'

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
  }

  handleSignup(e) {
    e.preventDefault()
    if(this.state.password !== this.state.confirmPassword){
      return Materialize.toast("Password Didn't Match", 5000, 'red');
    }
    this.props.signup(this.state, this.props, Materialize)
    .catch(error => {
      if(error.response.status === 400){
        error.response.data.message.map(err =>{
          return Materialize.toast(err.msg, 5000, 'red');
        });
      }else if(error.response.status === 401){
        Materialize.toast(error.response.data.message, 5000, 'red');
      }else if(error.response.status === 409){
        Materialize.toast(error.response.data.message, 5000, 'red');
      }else{
        Materialize.toast("Error Loggin in please try again later", 5000, 'red');
      }
    });
  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="fname" name="firstname" value={ this.state.firstname } type="text" className="validate" onChange={ this.handleChange.bind(this) } />
              <label htmlFor="fname">First Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="lname" name="lastname" value={ this.state.lastname } type="text" className="validate" onChange={ this.handleChange.bind(this) } />
              <label htmlFor="lname">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" name="email" value={ this.state.email } type="text" className="validate" onChange={ this.handleChange.bind(this) } />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="phone" name="phone" value={ this.state.phone } type="text" className="validate" onChange={ this.handleChange.bind(this) } />
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" name="password" value={ this.state.password } type="password" className="validate"  onChange={ this.handleChange.bind(this) }/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="confirmPassword" name="confirmPassword" value={ this.state.confirmPassword } type="password" className="validate" onChange={ this.handleChange.bind(this) } />
              <label htmlFor="confirmPassword">Conform Password</label>
            </div>
          </div>
          <div className="row">
            <a onClick={ this.handleSignup.bind(this) } className="waves-effect waves-light btn">Sign In</a>
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

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signup: signup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);