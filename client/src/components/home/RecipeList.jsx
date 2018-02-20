import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortId from 'shortid';
import MDSpinner from "react-md-spinner";
import { getAllRecipes } from '../../actions/recipes';
import { addFavourite, checkFavourite } from '../../actions/favouritesAction';

/**
 * 
 * @class RecipeList
 * 
 * @extends {Component}
 */
export class RecipeList extends Component {
  /**
   * @description Creates an instance of RecipeList.
   * 
   * @param {object} props 
   * 
   * @memberof RecipeList
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: undefined,
    };
    this.handleAddFavourite = this.handleAddFavourite.bind(this);
  }

  /**
   * @description
   * 
   * @returns {undefined}
   * 
   * @memberof RecipeList
   */
  componentDidMount() {
    this.setState({
      recipes: this.props.allRecipes
    });
    $('ul.tabs').tabs();
  }

  /**
   * @description
   * 
   * @param {object} nextProps updated props object
   * 
   * @returns {undefined}
   * 
   * @memberof RecipeList
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.allRecipes || nextProps.recipes
    });
  }

  /**
   * @description A method to handle add favourite for the recipe listing page
   * 
   * @param {object} event event object
   * 
   * @returns {object} return error boject to display to the user or a succes message on successful completion
   * 
   * @memberof RecipeList
   */
  handleAddFavourite(event) {
    event.preventDefault();
    const { userId } = this.props.user;
    const recipeId = Number(event.target.dataset['id']);
    this.props.addFavourite({ userId, recipeId }, Materialize);
  }

  /**
   * @description
   * 
   * @returns {object} JSX object
   * 
   * @memberof RecipeList
   */
  recipeList() {
    const recipes = this.state.recipes || [];
    let recipeChunk = [];
    let chunkSize = 4;
    for (let i = 0; i < recipes.length; i += chunkSize) {
      recipeChunk.push(recipes.slice(i, i + chunkSize));
    }
    return recipeChunk.map(chunk => {
      return (
        <div className="row" key={shortId.generate()}>
          {chunk.map(recipe => {
            return (
              <div className="col s12 m6 l3" key={shortId.generate()}>
                <div
                  className="card"
                  style={{
                    maxHeight: '415px',
                    minHeight: '415px'
                  }}
                >
                  <div className="card-image">
                    <Link to={`/recipe/${recipe.id}`}>
                      <img
                        style={{
                          width: '100%',
                          height: '250px'
                        }}
                        src={recipe.imageUrl}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div
                    className="card-content"
                    style={{
                      padding: '10px',
                      paddingTop: '20px'
                    }}
                  >
                    <Link to={`/recipe/${recipe.id}`}>
                      <span
                        className="card_title"
                        style={{
                          wordWrap: 'break-word',
                          maxHeight: '50px',
                          overflow: 'hidden'
                        }}
                      >
                        {recipe.title.length > 25
                          ? `${recipe.title.slice(0, 26)}...`
                          : recipe.title
                        }
                      </span>
                    </Link>
                    <p
                      className="card-p"
                      style={{
                        wordWrap: 'break-word'
                      }}
                    >
                      {recipe.description.length > 30
                        ? `${recipe.description.slice(0, 31)}...`
                        : recipe.description
                      }
                    </p>
                    <hr style={{ borderTop: "1px thin #1111" }} />
                    <div className="row">
                      <div
                        className="col s3 m3 l3 tooltipped text-green"
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Views"
                      >
                        <i className="fa fa-eye" aria-hidden="true">
                          {recipe.viewCount}
                        </i>
                      </div>
                      <div
                        className="col s3 m3 l3 tooltipped text-green"
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Upvotes"
                      >
                        <i className="fa fa-thumbs-o-up" aria-hidden="true">
                          {recipe.upVotes}
                        </i>
                      </div>
                      <div
                        className="col s3 m3 l3 tooltipped modal-trigger text-green"
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Downvotes"
                      >
                        <i className="fa fa-thumbs-o-down" aria-hidden="true">
                          {recipe.downVotes}
                        </i>
                      </div>
                      <div
                        className="col s3 m3 l3 tooltipped modal-trigger text-green"
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Reviews"
                      >
                        <i className="fa fa-comments" aria-hidden="true">
                          {recipe.Reviews ? recipe.Reviews.length : 0}
                        </i>
                      </div>
                    </div>
                    {/* <hr style={{ borderTop: "1px solid #26a69a" }} /> */}
                    <span className="text-gray">
                      By: {recipe.User ? recipe.User.firstName : ''}{' '}
                      {recipe.User ? recipe.User.lastName : ''}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )
    });
  }

  /**
   * @description A function to show the user a notification if no recipe is found
   * 
   * @returns {object} JSX object
   * 
   * @memberof RecipeList
   */
  noRecipe() {
    return (
      <div>
        <h5 className="top-margin-50" style={{ textAlign: 'center' }}>
          No reicpe found!!!
        </h5>
      </div>
    );
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof RecipeList
   */
  render() {
    return (
      <div id="test-swipe-1" className="col s12 top-margin-20">
        {
          this.state.recipes === undefined
            ? <div className="center-align"><MDSpinner size={40} /></div>
            :
            this.state.recipes && this.state.recipes.length > 0
              ? this.recipeList(this.state.recipes)
              : this.noRecipe()
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    recipes: {
      allRecipes, errors, favourites
    },
    auth: {
      user, loggedIn
    }
  } = state;
  return {
    errors, loggedIn, user, favourites, recipes: allRecipes,
  };
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllRecipes,
    addFavourite,
    checkFavourite
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
