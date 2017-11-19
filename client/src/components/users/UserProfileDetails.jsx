import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class UserProfileDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    const user = this.props.user;
    this.setState({
       user : user
    })
  }

  render() {  
   console.log(this.state);
    if(this.state.user){ 
      const {firstname, lastname, email, userId, phone } = this.state.user;
    return ( 
          <div className="container">
            <h4 className="top-margin">User Profile</h4><hr style={{ borderTop: "1px solid #26a69a" }}  />
            <div className="row">
              <div className="col s12 m3 l3 top-margin-50">
                <div className="row">
                  <div className="col s12 m12 l12">
                    <div id="row">
                      <div className="col s8 m10 l10" style= {{ height: "200px" }}>
                        <img style={{ width: "100%", height: "100%" }} className="top-margin" src="./images/oti.jpg" />
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
            <div className="col s12 m5 l5 text-gray top-margin-50">
              <h4 className="bold " style={{ fontSize: "18px" }}>USER BIO</h4>
              <p><span className="bold">Name:</span> { firstname } { lastname }</p>
              <p><span className="bold">Email:</span> { email }</p>
              <p><span className="bold">Phone:</span> { phone }</p>
              <p><span className="bold">Gender:</span> Male</p>
            </div>
            <div className="col s12 m4 l4">
              <div className="top-margin-50">
                <Link to={`/addrecipe`}  className="waves-effect waves-light btn" style={{ width: "200px", marginBottom: "5px" }}>Add Recipe</Link>
                <Link to={`/myrecipes`} className="waves-effect waves-light btn" style={{ width: "200px", marginBottom: "5px" }}>My Recipes</Link>
                <Link to={`/favouriterecipes`} className="waves-effect waves-light btn" style={{ width: "200px", marginBottom: "5px" }}>Favourites</Link>
                <Link to={`/editprofile`} className="waves-effect waves-light btn" style={{ width: "200px", marginBottom: "5px" }}>Edit Profile</Link>
              </div>
            </div>
          </div>
          <div className="clr"></div><br /><br />
          <div className="row top-padding-30">
            <div className="col s3 m3 l3">
              <Link to="" ><i className="material-icons prefix text-green tooltipped" data-position="bottom" data-delay="50" data-tooltip="Upvotes">thumb_up</i></Link><br/><span className="bold text-green" >135</span>
            </div>	
            <div className="col s3 m3 l3">
              <Link to="" className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Downvotes"><i className="material-icons prefix text-green">thumb_down</i></Link><br/><span className="bold text-green">135</span>
            </div>
            <div className="col s3 m3 l3">
              <div className="">
                <Link to="" className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Favourites"><i className="material-icons small text-green">favorite</i></Link><br/><span className="bold text-green">135</span>
              </div>
            </div>  
            <div className="col s3 m3 l3">
              <Link to="" className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Reviews"><i className="material-icons prefix text-green" >rate_review</i></Link><br/><span className="bold text-green">135</span>
            </div>   
          </div>
        <br/><br/>
      </div>
    );
  }else{ return <div/> }
  }
}

function mapStateToProps(state) {
  return { user : state.auth.user };
}

export default connect(mapStateToProps)(UserProfileDetails);
