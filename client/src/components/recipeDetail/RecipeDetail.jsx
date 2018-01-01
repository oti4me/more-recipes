import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import shortId from 'shortid';
import ReviewModal from './ReviewModal.jsx';
import ReviewCommentBox from './ReviewCommentBox.jsx';
import { getRecipe } from '../../actions/RecipeDetails';
import { getReviews } from '../../actions/getReviews';
import { addFavourite, getFavourites } from '../../actions/favouritesAction';
import { upvoteRecipe, downVoteRecipe } from '../../actions/votesAction';

class RecipeDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      comment: '',
      reviews: [],
    };
    this.handleUpvote = this.handleUpvote.bind(this)
    this.handleAddFavourite = this.handleAddFavourite.bind(this)
    this.handleDonwvote = this.handleDonwvote.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id, () => {
      this.props.getReviews(id, (response) => {
        if (response) {
          const { recipe, reviews } = this.props;
          this.setState({
            recipe,
            reviews
          });
        }
      })
    });
    $('.modal').modal();
  }

  componentDidUpdate() {
    if (this.props.reviews > this.state.reviews) {
      this.setState({
        reviews: this.props.reviews,
        recipe: this.props.recipe
      });
    }
    if (this.props.recipe && this.props.recipe.Favourites > this.state.recipe.Favourites) {
      this.setState({
        recipe: this.props.recipe
      });
    }
    if (this.props.recipe && this.props.recipe.upvotes !== this.state.recipe.upvotes) {
      this.setState({
        recipe: this.props.recipe
      });
    }
    if (this.props.recipe && this.props.recipe.downvotes !== this.state.recipe.downvotes) {
      this.setState({
        recipe: this.props.recipe
      });
    }
  }

  handleAddFavourite(e) {
    e.preventDefault();
    const { userId } = this.props.user;
    const recipeId = Number(e.target.dataset['id']);
    this.props.addFavourite({ userId, recipeId }, (res) => {
      if (res) {
        const id = this.props.match.params.id;
        this.props.getRecipe(id, (result) => {
          if (result) {
            return Materialize.toast('Added to favourites', 3000, 'green');
          }
        })
      } else {
        const { errors } = this.props;
        if (errors.status === 400) {
          errors.message.map(err => {
            Materialize.toast(err.msg, 4000, 'red');
          });
        } else if (errors.status === 409) {
          return Materialize.toast(errors.message, 3000, 'red');
        }
      }
    });
  }

  handleUpvote(e) {
    e.preventDefault();
    const recipeId = Number(e.target.dataset['id']);
    this.props.upvoteRecipe(recipeId, (res) => {
      if (res) {
        const id = this.props.match.params.id;
        const { upVotes } = this.props;
        this.props.getRecipe(id, (result) => {
          if (result) {
            upVotes.message === 'upvotes added' ? Materialize.toast(upVotes.message, 3000, 'green') : Materialize.toast(upVotes.message, 3000, 'red');
          }
        })
      } else {
        const { errors } = this.props;
        if (errors.status === 400) {
          errors.message.map(err => {
            Materialize.toast(err.msg, 4000, 'red');
          });
        } else if (errors.status === 409) {
          return Materialize.toast(errors.message, 3000, 'red');
        }
      }
    });
  }

  handleDonwvote(e) {
    e.preventDefault();
    const recipeId = Number(e.target.dataset['id']);
    this.props.downVoteRecipe(recipeId, (res) => {
      if (res) {
        const id = this.props.match.params.id;
        const { downVotes } = this.props;
        console.log(downVotes)
        this.props.getRecipe(id, (result) => {
          if (result) {
            console.log(result)
            downVotes.message === 'downvotes added' ? Materialize.toast(downVotes.message, 3000, 'green') : Materialize.toast(downVotes.message, 3000, 'red');
          }
        })
      } else {
        const { errors } = this.props;
        if (errors.status === 400) {
          errors.message.map(err => {
            Materialize.toast(err.msg, 4000, 'red');
          });
        } else if (errors.status === 409) {
          return Materialize.toast(errors.message, 3000, 'red');
        }
      }
    });
  }


  render() {
    const { id, title, description, direction, ingredients, upvotes, downvotes, image, User, Favourites } = this.state.recipe;
    const style1 = {
      borderRight: '1px solid #ccc',
      color: 'rgba(0,0,0,0.5)',
    }
    const style2 = {
      fontSize: '22px',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    }

    const colorTransparent = {
      color: 'rgba(0,0,0,0.5)'
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
                    {this.state.reviews ? this.state.reviews.length : ''} <i className="material-icons" >rate_review</i>
                  </span>
                </a>
              </div>
              <div className="col s3 m3 l3" style={style1} onClick={this.handleUpvote}>
                <a href="#">
                  <span className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Upvotes" style={{ color: "#ff7e1a" }}>
                    {upvotes} <i data-id={id} className="material-icons" >thumb_up</i>
                  </span>
                </a>
              </div>
              <div className="col s3 m3 l3" style={style1} onClick={this.handleDonwvote}>
                <a href="#" >
                  <span className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Downvotes" style={{ color: "#ff7e1a" }}>
                    {downvotes} <i data-id={id} className="material-icons">thumb_down</i>
                  </span>
                </a>
              </div>
              <div className="col s3 m3 l3" style={colorTransparent} onClick={this.handleAddFavourite}>
                <a href="#">
                  <span className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Favourites" style={{ color: "#ff7e1a" }}>
                    {Favourites ? Favourites.length : ''} <i data-id={id} className="material-icons">favorite</i>
                  </span>
                </a>
              </div>
            </div>
            <hr style={{ borderTop: "1px solid #26a69a" }} />
            <div className="row">
              <div className="col s12 m3 l3">
                <div className="" >
                  <img style={{ position: 'relative', borderRadius: '50%', maxWidth: '60px', maxHeight: '50px' }} src="/images/profile-avata.png" />
                </div>
              </div>
              <div className="col s12 m9 l9">
                <p style={colorTransparent}><span style={{ color: '#ccc' }}>Recipe By: {User ? User.firstname : ''} {User ? User.lastname : ''}</span></p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m12 l12">
                <h5 className="bolder">Description</h5>
                <p style={colorTransparent}>{this.state.recipe.description}</p></div>
            </div>
          </div>
          <div className="col s12 m7 l7">
            <div style={{ width: '100%', height: '300px', position: 'relative' }} >
              <img className="materialboxed" data-caption={title} style={{ width: '100%', height: '300px' }} src={image} />
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
        {id ? <ReviewModal id={id} /> : ''}
        <ReviewCommentBox { ...this.props } />
      </div >
    );
  }
}



function mapStateToProps(state) {
  return {
    recipe: state.recipes.recipe,
    reviews: state.recipes.reviews,
    user: state.auth.user,
    errors: state.recipes.errors,
    upVotes: state.recipes.upVotes,
    downVotes: state.recipes.downVotes
  };
}

export default connect(mapStateToProps, { getRecipe, getReviews, addFavourite, getReviews, upvoteRecipe, downVoteRecipe })(RecipeDetail);
