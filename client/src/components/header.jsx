import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../actions/SigninAction';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSignOut(){
    this.props.signOut(this.props.history);
  }

  topMenu() {
    console.log(this.props.state.loggedIn)
    if(!this.props.state.loggedIn){
      return (
      <nav>
        <div className="nav-wrapper color-green left-padding-20">
          <a href="/home" className="brand-logo">More Recipes</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/signin">Sign In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    );
    }else{
      return (
      <nav>
        <div className="nav-wrapper color-green left-padding-20">
          <a href="#" className="brand-logo">More Recipes</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/profile">User Account</a>
            </li>
            <li>
              <a href="" onClick={this.handleSignOut.bind(this)} >Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    );
    }
  }

  render() {
   return this.topMenu();
  }
}

function mapStateToProps(state) {
  return { state : state.auth.loggedIn };
}

export default connect(mapStateToProps, { signOut })(Header);