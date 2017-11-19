import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../actions/SigninAction';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, 
      hover: true, 
      gutter: 0, 
      belowOrigin: false, 
      alignment: 'left', 
      stopPropagation: false
    }
  );
  }

  handleSignOut(){
    this.props.signOut(this.props.history);
  }

  topMenu() {
    const style1 = {
      marginTop: '65px'
    }
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
              <a className="dropdown-button" href="#" data-activates='dropdown1'>User Account</a>
            </li>
            <li>
              <a href="" onClick={this.handleSignOut.bind(this)} >Logout</a>
            </li>
          </ul>
        </div>
        <ul id='dropdown1' className='dropdown-content' style={style1}>
          <li><a href="/profile">Profile</a></li>
          <li className="divider"></li>
          <li><a href="addrecipe">Add Recipe</a></li>
          <li className="divider"></li>
          <li><a href="myrecipes">My Recipes</a></li>
          <li className="divider"></li>
          <li><a href="favourites">Favourite Recipes</a></li>
        </ul>
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