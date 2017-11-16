import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { signin } from '../../actions/SigninAction.js'


class SigninForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
  
  handleSignin(e) {
    e.preventDefault();
    this.props.signin(this.state, this.props.history, this.props.dispatch)
    .catch(error => {
      if(error.response.status === 400){
        error.response.data.message.map(err =>{
          return Materialize.toast(err.msg, 5000, 'red');
        });
      }else if(error.response.status === 401){
        Materialize.toast(error.response.data.errors.message, 5000, 'red');
      }else{
        Materialize.toast(error.response.data.errors, 5000);
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
              <input id="email" name="email" type="text" value={ this.state.email } onChange={ this.handleChange.bind(this)} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" name="password" type="password" value={ this.state.password } onChange={ this.handleChange.bind(this)}/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <a className="waves-effect waves-light btn" onClick={this.handleSignin.bind(this)}>Sign In</a>
          </div>
          <div className="row">
            <p className="">Don't have an account?
              <a href="/signup"> Sign Up</a>
              <br/>Forget Password? click
              <a href="forget_password.html">Here</a>
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
  return bindActionCreators({ signin: signin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);