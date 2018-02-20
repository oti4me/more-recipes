import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import MDSpinner from "react-md-spinner";
import ReviewModal from './ReviewModal';
import ReviewCommentBox from './ReviewCommentBox';
import recipeDetails from '../../actions/recipeDetails';
import { getReviews } from '../../actions/getReviews';
import { addFavourite, checkFavourite } from '../../actions/favouritesAction';
import { upvoteRecipe, downVoteRecipe } from '../../actions/votesAction';
import profileImage from '../../../public/images/profile-avata.png';
import TopRecipeList from './TopRecipeList';

/**
 * 
 * @class RecipeDetail
 * 
 * @extends {Component}
*/
export class RecipeDetail extends Component {

  /**
   * @description Creates an instance of RecipeDetail.
   * 
   * @param {object} props 
   * 
   * @memberof RecipeDetail
  */
  constructor(props) {
    super(props);
    this.state = {
      recipe: undefined,
      reviews: [],
    };
    this.handleUpvote = this.handleUpvote.bind(this)
    this.handleAddFavourite = this.handleAddFavourite.bind(this)
    this.handleDonwvote = this.handleDonwvote.bind(this)
  }

  /**
   * @description Fetch data and update state 
   * 
   * @return {undefined} No returned value
   * 
   * @memberof RecipeDetail
   */
  componentDidMount() {
    const { id } = this.props.match.params;
    const { user: { userId } } = this.props;
    const {
      getReviews,
      checkFavourite,
      recipeDetails
    } = this.props;
    recipeDetails(id, this.props.history);
    checkFavourite(userId, id);
    getReviews(id);

    $('.modal').modal();
    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip({ delay: 5 });
  }

  /**
   * @description update state with updated props
   * 
   * @param {object} nextProps 
   * 
   * @returns {undefined} No returned value
   * 
   * @memberof RecipeDetail
   */
  componentWillReceiveProps(nextProps) {
    const { reviews, recipe, isFavourite } = nextProps;
    this.setState({
      reviews,
      recipe,
      isFavourite
    });
  }

  /**
   * @description
   * 
   * @param {object} event
   * 
   * @return {undefined}
   * 
   * @memberof RecipeDetail
   */
  handleAddFavourite(event) {
    event.preventDefault();
    const { userId } = this.props.user;
    const recipeId = Number(event.target.dataset['id']);
    this.props.addFavourite({ userId, recipeId }, Materialize)
  }

  /**
   * @description
   * 
   * @param {object} event
   * 
   * @return {undefined}
   * 
   * @memberof RecipeDetail
   */
  handleUpvote(event) {
    event.preventDefault();
    const recipeId = Number(event.target.dataset['id']);
    this.props.upvoteRecipe(recipeId);
  }

  /**
   * @description
   * 
   * @param {object} event
   * 
   * @return {undefined}
   * 
   * @memberof RecipeDetail
   */
  handleDonwvote(event) {
    event.preventDefault();
    const recipeId = Number(event.target.dataset['id']);
    this.props.downVoteRecipe(recipeId);
  }

  /**
   * @description A mothed that return a jsx for recipe details
   * 
   * @return {object} jsx object
   * 
   * @memberof RecipeDetail
   */
  render() {
    const {
      id, title, description, direction,
      ingredients, upVotes, downVotes,
      imageUrl, User
    } = this.state.recipe || 0;

    return (
      <div>
        {

          this.state.recipe === undefined
            ? <MDSpinner />
            :
            <div>
              <div className="col s12 m10 l10" >
                <div className="row">
                  <div className="col s12 m5 l5">
                    <h4 className="recipe-title">{title}</h4>
                    <hr style={{ borderTop: "1px solid #26a69a" }} />
                    <div className="row">
                      <div
                        className="col s3 m3 l3 colorTransparent"
                        style={{
                          borderRight: '1px solid #ccc'
                        }}
                      >
                        <Link to="#reviews" className="modal-trigger">
                          <span
                            className="tooltipped "
                            data-position="bottom"
                            data-delay="50"
                            data-tooltip="Reviews"
                            style={{ color: "#ff7e1a" }}
                          >
                            {this.state.reviews
                              ? this.state.reviews.length
                              : ''}
                            {' '}
                            <i
                              className="material-icons"
                            >
                              rate_review
                          </i>
                          </span>
                        </Link>
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        className="col s3 m3 l3 colorTransparent"
                        style={{
                          borderRight: '1px solid #ccc'
                        }}
                        onClick={this.handleUpvote}
                      >
                        <Link to="#">
                          <span
                            className="tooltipped"
                            data-position="bottom"
                            data-delay="50"
                            data-tooltip="Upvotes"
                            style={{ color: "#ff7e1a" }}
                          >
                            {upVotes}{' '}
                            <i
                              data-id={id}
                              className="material-icons"
                            >
                              thumb_up
                          </i>
                          </span>
                        </Link>
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        className="col s3 m3 l3 colorTransparent"
                        style={{
                          borderRight: '1px solid #ccc'
                        }}
                        onClick={this.handleDonwvote}
                      >
                        <Link to="#" >
                          <span
                            className="tooltipped"
                            data-position="bottom"
                            data-delay="50"
                            data-tooltip="Downvotes"
                            style={{ color: "#ff7e1a" }}
                          >
                            {downVotes}{' '}
                            <i
                              data-id={id}
                              className="material-icons"
                            >
                              thumb_down
                          </i>
                          </span>
                        </Link>
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        className="col s3 m3 l3 colorTransparent"
                        onClick={this.handleAddFavourite}
                      >
                        <Link to="#">
                          <span
                            className="tooltipped"
                            data-position="bottom"
                            data-delay="50"
                            data-tooltip="Favourites"
                            style={{ color: "#ff7e1a" }}
                          >
                            {
                              this.state.isFavourite
                                && this.state.isFavourite === true
                                ?
                                <i
                                  data-id={id}
                                  className="material-icons"
                                >
                                  favorite
                                </i>
                                :
                                <i
                                  data-id={id}
                                  className="material-icons"
                                >
                                  favorite_border
                                </i>
                            }
                          </span>
                        </Link>
                      </div>
                    </div>
                    <hr style={{ borderTop: "1px solid #26a69a" }} />
                    <div className="row">
                      <div className="col s12 m3 l3">
                        <div className="" >
                          <img
                            className="profileImage"
                            src={profileImage} //"/images/profile-avata.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col s12 m9 l9">
                        <p className="colorTransparent">
                          <span style={{ color: '#ccc' }}>
                            Recipe By: {User ? User.firstName : ''} {' '}
                            {User ? User.lastName : ''}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12 m12 l12">
                        <h5 className="bolder">Description</h5>
                        <p className="colorTransparent wrap">{description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m7 l7">
                    <div>
                      <img
                        className="materialboxed"
                        data-caption={title}
                        style={{ width: '100%', height: '300px' }}
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m6 l6">
                    <h4>Ingredients</h4>
                    <p className="colorTransparent wrap">
                      {ingredients}
                    </p>
                  </div>
                  <div className="col s12 m6 l6">
                    <h4>Direction</h4>
                    <p className="colorTransparent wrap"> {direction}</p>
                  </div>
                  {id ? <ReviewModal id={id} /> : ''}
                  <ReviewCommentBox {...this.props} />
                </div>
                {' '}{id ? <ReviewModal id={id} /> : ''}
                <ReviewCommentBox {...this.props} />
              </div >
              <TopRecipeList />
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    favourites: state.recipes.favourites,
    recipe: state.recipes.recipe,
    reviews: state.recipes.reviews,
    user: state.auth.user,
    errors: state.recipes.errors,
    upVotes: state.recipes.upVotes,
    downVotes: state.recipes.downVotes,
    isFavourite: state.recipes.isFavourite
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    recipeDetails,
    getReviews,
    addFavourite,
    upvoteRecipe,
    downVoteRecipe,
    checkFavourite
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
