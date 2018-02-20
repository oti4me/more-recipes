import React, { Component } from 'react';
import { connect } from 'react-redux'
import UseProfileDetails from './UserProfileDetails'
import Footer from '../Footer'
import Header from '../Header'

/**
 * @description A class to create UserProfilePage object
 * 
 * @class UserProfilePage
 * 
 * @extends {Component}
 */
export class UserProfilePage extends Component {

  /**
   * @description Creates an instance of UserProfilePage.
   * 
   * @param {object} props 
   * 
   * @memberof UserProfilePage
   */
  constructor(props) {
    super(props);
  }

  /**
   * @description Displays the user profile
   * 
   * @returns {object} JSX object
   * 
   * @memberof UserProfilePage
   */
  render() {
    return (
      <div className="main">
        <Header {...this.props} />
        <div className="cont">
          <UseProfileDetails {...this.props} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(UserProfilePage);
