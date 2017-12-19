import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { signOut } from '../actions/SigninAction';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: false,
      gutter: 0,
      belowOrigin: false,
      alignment: 'left',
      stopPropagation: false
    }
    );

    $(".button-collapse").sideNav();
  }

  handleSignOut(e) {
    e.preventDefault();
    this.props.signOut(this.props.history);
  }

  loggedInMenu() {
    const style1 = {
      marginTop: '50px'
    }
    return (
      <nav>
        <div className="nav-wrapper color-green header1">
          <a href="#" className="brand-logo">More Recipes</a>
          <a href="#" data-activates="mobile2" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a className="dropdown-button" href="#" data-activates='dropdown2'>User Account</a>
            </li>
            <li>
              <a href="" onClick={this.handleSignOut} >Logout</a>
            </li>
            <ul id='dropdown2' className='dropdown-content' style={style1}>
              <li><a href="/profile">Profile</a></li>
              <li className="divider"></li>
              <li><a href="/addrecipe">Add Recipe</a></li>
              <li className="divider"></li>
              <li><a href="/myrecipes">My Recipes</a></li>
              <li className="divider"></li>
              <li><a href="/favourites">Favourites</a></li>
            </ul>
          </ul>
          <ul className="side-nav" id="mobile2">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a className="dropdown-button" href="#" data-activates='dropdown1'>User Account</a>
            </li>
            <li>
              <a href="#" onClick={this.handleSignOut.bind(this)} >Logout</a>
            </li>
            <ul id='dropdown1' className='dropdown-content' style={style1}>
              <li><a href="/profile">Profile</a></li>
              <li className="divider"></li>
              <li><a href="/addrecipe">Add Recipe</a></li>
              <li className="divider"></li>
              <li><a href="/myrecipes">My Recipes</a></li>
              <li className="divider"></li>
              <li><a href="/favourites">Favourites</a></li>
            </ul>
          </ul>
        </div>
      </nav>
    )
  }

  notLoggedInMenu() {
    return (
      <nav>
        <div className="nav-wrapper color-green left-padding-20 header1">
          <a href="/home" className="brand-logo">More Recipes</a>
          <a href="#" data-activates="mobile1" className="button-collapse"><i className="material-icons">menu</i></a>
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
          <ul className="side-nav" id="mobile1">
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
    )
  }

  topMenu() {
    if (this.props.loggedIn) {
      return this.loggedInMenu();
    }
    else {
      return this.notLoggedInMenu()
    }
  }

  render() {
    return this.topMenu();
  }
}


Header.propTypes = {
  loggedIn: PropTypes.bool,
  signOut: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signOut }, dispatch);
}

function mapStateToProps(state) {
  return { loggedIn: state.auth.loggedIn };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);