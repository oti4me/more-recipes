import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { signOut } from '../actions/signinAction';

/**
 * 
 * @class Header
 * 
 * @extends {Component}
 */
class Header extends Component {

  /**
   * 
   * @param {object} props 
   * 
   * @memberof Header
   */
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  /**
   * @description Creates an instance of Header.
   * 
   * @returns {undefined}
   * 
   * @memberof Header
   */
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
    $(".button-collapse").sideNav({
      closeOnClick: true,
      draggable: false,
    });

  }

  /**
   * @description Creates an instance of Header.
   * 
   * @param {object} event 
   * 
   * @returns {undefined}
   * 
   * @memberof Header
   */
  handleSignOut(event) {
    event.preventDefault();
    this.props.signOut(this.props.history);
  }

  /**
   * @description create menu componet for authenticated user.
   * 
   * @returns {object} jsx object
   * 
   * @memberof Header
   */
  loggedInMenu() {
    return (
      <nav>
        <div className="nav-wrapper color-green header1">
          <Link to="/home" className="brand-logo" style={{ fontSize: '22px' }}>
            More-Recipes
          </Link>
          <Link to="!#" data-activates="mobile2" className="button-collapse">
            <i className="material-icons">menu</i>
          </Link>
          <ul
            id="nav-mobile"
            className="right hide-on-med-and-down"
            style={{ width: '330px' }}
          >
            <li>
              <Link to="/home">
                <i className="fa fa-home" aria-hidden="true"> Home</i>
              </Link>
            </li>
            <li>
              <Link
                to="!#"
                className="dropdown-button"
                data-activates='dropdown2'
              >
                <i className="fa fa-user-circle-o" aria-hidden="true">
                  {' '}User Account{' '}
                  <i className="fa fa-angle-down" aria-hidden="true" />
                </i>
              </Link>
            </li>
            <li>
              <Link to="!#" onClick={this.handleSignOut} >
                <i className="fa fa-sign-out" aria-hidden="true"> Logout</i>
              </Link>
            </li>
            <ul
              id="dropdown2"
              className='dropdown-content'
              style={{ marginTop: '50px' }}
            >
              <li>
                <Link to="/profile">
                  <i className="fa fa-user-circle" aria-hidden="true">
                    {' '} Profile
                  </i>
                </Link>
              </li>
              <li className="divider" />
              <li>
                <Link to="/addrecipe">
                  <i className="fa fa-plus-square" aria-hidden="true">
                    {' '} Add Recipe
                  </i>
                </Link>
              </li>
              <li className="divider" />
              <li>
                <Link to="/myrecipes">
                  <i className="fa fa-cutlery" aria-hidden="true">
                    {' '} My Recipes
                  </i>
                </Link>
              </li>
              <li className="divider" />
              <li>
                <Link to="/favourites">
                  <i className="fa fa-heart" aria-hidden="true">
                    {' '} Favourites
                  </i>
                </Link>
              </li>
            </ul>
          </ul>

          <ul className="side-nav" id="mobile2">
            <li>
              <Link to="/home">
                <i className="fa fa-home" aria-hidden="true">
                  Home
                </i>
              </Link>
            </li>
            <li className="divider" />
            <li>
              <Link to="/profile">
                <i className="fa fa-user-circle" aria-hidden="true">
                  Profile
                  </i>
              </Link>
            </li>
            <li className="divider" />
            <li>
              <Link to="/addrecipe">
                <i className="fa fa-plus-square" aria-hidden="true">
                  Add Recipe
                  </i>
              </Link>
            </li>
            <li className="divider" />
            <li>
              <Link to="/myrecipes">
                <i className="fa fa-cutlery" aria-hidden="true">
                  My Recipes
                  </i>
              </Link>
            </li>
            <li className="divider" />
            <li>
              <Link to="/favourites">
                <i className="fa fa-heart" aria-hidden="true">
                  Favourites
                  </i>
              </Link>
            </li>
            <li className="divider" />
            <li>
              <Link to="!#" onClick={this.handleSignOut} >
                <i className="fa fa-sign-out" aria-hidden="true"> Logout</i>
              </Link>
            </li>
            <li className="divider" />
          </ul>

        </div>
      </nav >
    )
  }
  /**
   * @description create top menu for unthenticated user Header.
   * 
   * @returns {object} jsx object 
   * 
   * @memberof Header
   */
  notLoggedInMenu() {
    return (
      <nav>
        <div className="nav-wrapper color-green left-padding-20 header1">
          <Link to="/home" className="brand-logo" style={{ fontSize: '22px' }}>
            More-Recipes
          </Link>
          <Link to="!#" data-activates="mobile1" className="button-collapse">
            <i className="material-icons">menu</i>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/home">
                <i className="fa fa-home" aria-hidden="true">  Home</i>
              </Link>
            </li>
            <li>
              <Link to="/signin">
                <i className="fa fa-sign-in" aria-hidden="true"> Sign In</i>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <i className="fa fa-sign-in" aria-hidden="true">
                  Sign Up
                </i>
              </Link>
            </li>
          </ul>
          <ul className="side-nav" id="mobile1">
            <li>
              <Link to="/home">
                <i className="fa fa-home" aria-hidden="true">
                  Home
                </i>
              </Link>
            </li>
            <li>
              <Link to="/signin">
                <i className="fa fa-sign-in" aria-hidden="true">
                  Sign In
                </i>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <i className="fa fa-sign-in" aria-hidden="true">
                  Sign Up
                </i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }

  /**
   * @description Creates an instance of Header.
   * 
   * @returns {object} top menu 
   * 
   * @memberof Header
   */
  render() {
    return (
      <div>
        {
          this.props.loggedIn ?
            this.loggedInMenu() :
            this.notLoggedInMenu()
        }
      </div>
    )
  }
}


Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signOut
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
