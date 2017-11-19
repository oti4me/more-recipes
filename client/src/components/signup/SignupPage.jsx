import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import SignupForm from './SignupForm.jsx'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'

class SignupPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header { ...this.props } />
        <div className="container">
          <div className="row">
            <div className="col s12  s2 m4 l4 offset-m4 offset-l4">
              <h2>Sign Up</h2>
              <SignupForm history = { this.props.history } />
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

export default connect(mapStateToProps)(SignupPage);
