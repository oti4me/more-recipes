 
const userReducer = (state = {}, action) => {
  switch(action.type){
    case 'USER_LOGIN' :
      return Object.assign({}, state, { user : action.payload});
      break;
      
    case 'USER_LOGOUT' :
      return Object.assign({}, state, { loggedIn : action.payload});
      break;
    
    case 'USER_LOGGEDIN' :
      return Object.assign({}, state, { loggedIn : action.payload});
      break;
      
    case 'USER_PROFILE' :
      return action.payload;
      break;
  }
  return state;
}

export default userReducer;