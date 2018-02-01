import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import shortId from 'shortid';
import PropTypes, { number } from 'prop-types';

/**
 * @description 
 * 
 * @class Search
 * 
 * @extends {Component}
 */
class SearchRecipe extends Component {
  /**
   * @description Creates an instance of Search.
   * 
   * @param {object} props 
   * 
   * @memberof Search
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  /**
   * @description update state with lastest props
   * 
   * @param {object} nextProps updated props object
   * 
   * @returns {undefined}
   * 
   * @memberof Search
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.recipes
    });
  }

  /**
   * @description
   * 
   * @returns {object} JSX object
   * 
   * @memberof Search
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
                  style={{ maxHeight: '500px', minHeight: '480px' }}
                >
                  <div className="card-image">
                    <Link to={`/recipe/${recipe.id}`}>
                      <img
                        style={{ width: '100%', height: '250px' }}
                        src={recipe.imageUrl}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div
                    className="card-content"
                    style={{ padding: '10px', paddingTop: '20px' }}
                  >
                    <Link to={`/recipe/${recipe.id}`}>
                      <span
                        className="card_title"
                        style={{ wordWrap: 'break-word' }}
                      >
                        {recipe.title.length > 30
                          ? `${recipe.title.slice(0, 31)}...`
                          : recipe.title
                        }
                      </span>
                    </Link>
                    <p className="card-p" style={{ wordWrap: 'break-word' }}>
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
   * @memberof Search
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
   * @memberof Search
   */
  render() {
    return (
      <div id="test-swipe-1" className="col s12 top-margin-20">
        {
          this.state.recipes && this.state.recipes.length > 0
            ? this.recipeList()
            : this.noRecipe()
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    errors: state.recipes.error,
    recipes: state.recipes.searchedRecipes,
  };
}

export default connect(mapStateToProps)(SearchRecipe);
