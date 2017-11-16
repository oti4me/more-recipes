import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import UseProfileDetails from './UserProfileDetails.jsx'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'

class UserProfilePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header { ...this.props } />
        <UseProfileDetails/>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(UserProfilePage);
