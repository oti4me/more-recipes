import React from 'react';
import PropTypes from 'prop-types';
import SigninForm from './SigninForm.jsx'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'

/**
 * 
 * 
 * @class SigninPage
 * @extends {React.Component}
 */
class SigninPage extends React.Component {

  /**
   * Creates an instance of SigninPage.
   * @param {undefined} props 
   * @memberof SigninPage
   */
  constructor(props) {
    super(props);
  }

  /**
   * 
   * 
   * @returns {JSX} returns the signin page
   * @memberof SigninPage
   */
  render() {
    return (
      <div className="main">
        <Header {...this.props} />
        <div className="container cont">
          <div className="row">
            <div className="col s12  s2 m6 l6 offset-m3 offset-l3">
              <h2 className="top-margin-50">Sign In</h2>
              <SigninForm {...this.props} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SigninPage.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default SigninPage;
