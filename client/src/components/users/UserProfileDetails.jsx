import React from 'react';
import { Link } from 'react-router-dom';
import avata from '../../../public/images/profile-avata.png';

/**
 * @description A class to create UserProfilePage object
 * 
 * @param {object} props
 * 
 * @returns {object} jsx object to render the user profile details
 */
const UserProfileDetails = (props) => {
  if (props.user) {
    const { firstName, lastName, email, userId, phone } = props.user;
    return (
      <div className="container">
        <h4 className="top-margin">User Profile</h4>
        <hr style={{ borderTop: "1px solid #26a69a" }} />
        <div className="row">
          <div className="col s12 m3 l3 top-margin-50">
            <div className="row">
              <div className="col s12 m12 l12">
                <div id="row">
                  <div className="col s8 m10 l10" style={{ height: "200px" }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      className="top-margin"
                      src={avata}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m5 l5 text-gray top-margin-50">
            <h4 className="bold " style={{ fontSize: "18px" }}>USER BIO</h4>
            <p><span className="bold name">Name:</span> {firstName} {lastName}</p>
            <p><span className="bold email">Email:</span> {email}</p>
            <p><span className="bold phone">Phone:</span> {phone}</p>
          </div>
          <div className="col s12 m4 l4">
            <div className="top-margin-50">
              <Link
                to="/addrecipe"
                className="waves-effect waves-light btn add"
                style={{ width: "200px", marginBottom: "5px" }}
              >
                Add Recipe
              </Link>
              <Link
                to="/myrecipes"
                className="waves-effect waves-light btn favourite"
                style={{ width: "200px", marginBottom: "5px" }}
              >
                My Recipes
              </Link>
              <Link
                to="/favourites"
                className="waves-effect waves-light btn myrecipes"
                style={{ width: "200px", marginBottom: "5px" }}
              >
                Favourites
              </Link>
            </div>
          </div>
        </div>
        <div className="clr" /><br /><br />
        <br /><br />
      </div>
    );
  } else { return <div /> }
}

export default UserProfileDetails;
