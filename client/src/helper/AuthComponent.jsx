// import isAuthenticated from './isAth.js';

import React, {Component} from 'react';
import {connect} from 'react-redux';


export default function(ComposedClass){
  class AuthenticationCheck extends Component{
    
    componentWillMount(){
      if(!this.props.state.loggedIn){
        Materialize.toast("Loggin Please", 3000, 'red');
        this.props.history.push('/signin');
      }
    }
    
    render(){
      return <ComposedClass {...this.props}/>
    }
    
  }
  
  function mapStateToProps(state){
    return { state : state.auth.loggedIn };
  }
  
  return connect(mapStateToProps)(AuthenticationCheck)
}