import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import shortId from 'shortid';
// import ReviewModal from './ReviewModal.jsx';
// import ReviewCommentBox from './ReviewCommentBox.jsx';
import { getRecipe } from '../../actions/RecipeDetails';

class RecipeDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      comment: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id, (id) => {
      const { recipe } = this.props;
      this.setState({
        recipe
      });
    });
    $('.modal').modal();
  }

  render() {
    const { title, description, direction, ingredients, upvotes, downvotes, image, User, Favourites, Reviews } = this.state.recipe;
    const style1 = {
      borderRight: "1px solid #ccc",
      color: "rgba(0,0,0,0.5)",
    }
    const style2 = {
      fontSize: "22px",
      textTransform: 'uppercase',
      fontWeight: 'bold'
    }

    const colorTransparent = {
      color: "rgba(0,0,0,0.5)"
    }

    return (
      <div className="col s12 m10 l10" >
        <div className="row">
          <div className="col s12 m5 l5">
            <h4 className="" style={style2}>{title}</h4>
            <hr style={{ borderTop: "1px solid #26a69a" }} />
            <div className="row">
              <div className="col s3 m3 l3" style={style1}>
                <a href="#reviews" className="modal-trigger">
                  <span className="tooltipped " data-position="bottom" data-delay="50" data-tooltip="Reviews" style={{ color: "#ff7e1a" }}>
                    {Reviews ? Reviews.length : ''} <i className="material-icons " >rate_review</i>
                  </span>
                </a>
              </div>
              <div className="col s3 m3 l3" style={style1}>
                <a href="#">
                  <span className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Upvotes" style={{ color: "#ff7e1a" }}>
                    {upvotes} <i className="material-icons " >thumb_up</i>
                  </span>
                </a>
              </div>
              <div className="col s3 m3 l3" style={style1}>
                <a href="#">
                  <span className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Downvotes" style={{ color: "#ff7e1a" }}>
                    {downvotes} <i className="material-icons">thumb_down</i>
                  </span>
                </a>
              </div>
              <div className="col s3 m3 l3" style={colorTransparent}>
                <a href="#">
                  <span className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Favourites" style={{ color: "#ff7e1a" }}>
                    {Favourites ? Favourites.length : ''} <i className="material-icons">favorite</i>
                  </span>
                </a>
              </div>
            </div>

            <hr style={{ borderTop: "1px solid #26a69a" }} />
            <div className="row">
              <div className="col s12 m3 l3">
                <div className="" >
                  <img style={{ position: "relative", borderRadius: "50%", maxWidth: "60px", maxHeight: "50px" }} src="/images/profile-avata.png" />
                </div>
              </div>
              <div className="col s12 m9 l9">
                <p style={colorTransparent}><span style={{ color: "#ccc" }}>Recipe By: {User ? User.firstname : ''} {User ? User.lastname : ''}</span></p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m12 l12">
                <h5 className="bolder">Description</h5>
                <p style={colorTransparent}>{this.state.recipe.description}</p></div>
            </div>
          </div>
          <div className="col s12 m7 l7">
            <div style={{ width: "100%", height: "300px", position: "relative" }} >
              <img style={{ width: "100%", height: "300px" }} src={image} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l6">
            <h4>Ingredients</h4>
            <p style={colorTransparent}>{this.state.recipe.ingredients}</p>
          </div>
          <div className="col s12 m6 l6">
            <h4>Direction</h4>
            <p style={colorTransparent} > {this.state.recipe.direction}</p>
          </div>
        </div>
        {/* <ReviewModal reviews={Reviews} />
        <ReviewCommentBox { ...this.props } /> */}
      </div >
    );
  }
}



function mapStateToProps(state) {
  return {
    recipe: state.recipes.recipe
  };
}

export default connect(mapStateToProps, { getRecipe })(RecipeDetail);
