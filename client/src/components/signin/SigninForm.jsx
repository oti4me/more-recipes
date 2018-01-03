import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { signin } from '../../actions/SigninAction.js';

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
        return this.props.history.push('/profile');
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
        <form className="col s12 z-depth-2" style={{ padding: '50px' }}>
          <div className="row">
            <div className="input-field col s12">
              <i class="material-icons prefix">email</i>
              <input id="email" name="email" type="text" value={this.state.email} onChange={this.handleChange.bind(this)} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i class="material-icons prefix">vpn_key</i>
              <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <a className="waves-effect waves-light btn" onClick={this.handleSignin.bind(this)}>Sign In</a>
          </div>
          <div className="row">
            <p className="">Don't have an account?
              <a href="/signup"> Sign Up</a>
              <br />Forget Password? click
              <a href="forget_password.html">Here</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

SigninForm.propTypes = {
  loggedIn: PropTypes.bool,
  error: PropTypes.object,
  signin: PropTypes.func,
};

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