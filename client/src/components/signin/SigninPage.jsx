import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import SigninForm from './SigninForm.jsx'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'


class SigninPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignin.bind(this);
  }

  handleSignin(user) {
    console.log("top level compoment handke signin");
    // this.props.handleSignin(user);
  }

  render() {
    return (
      <div>
        <Header { ...this.props } />
        <div className="container">
          <div className="row">
            <div className="col s12  s2 m4 l4 offset-m4 offset-l4">
              <h2 className="top-margin-50">Sign In</h2>
              <SigninForm handleSignin={this.handleSignin} history={this.props.history} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
