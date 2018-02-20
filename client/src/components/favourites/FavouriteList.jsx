import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import MDSpinner from "react-md-spinner";
import {
  getFavourites,
  removeFavourite
} from '../../actions/favouritesAction';

/**
 * @description creates an object of favourites recipes list
 * 
 * @class MyRecipesList
 * 
 * @extends {Component}
*/
export class FavouriteRecipesList extends Component {

  /**
   * @description Creates an instance of MyRecipesList.
   * 
   * @param {object} props 
   * 
   * @memberof FavouriteRecipesList
  */
  constructor(props) {
    super(props);
    this.state = {
      recipeId: null,
      favourites: undefined
    };
    this.favouritesList = this.favouritesList.bind(this);
    this.handleRemoveFavourite = this.handleRemoveFavourite.bind(this);
  }

  /**
    * @description Get favourite recipe list
    * 
    * @param {object} event 
    * 
    * @return {undefined}
    * 
    * @memberof FavouriteRecipesList
  */
  componentDidMount() {
    const { userId } = this.props.user;
    this.props.getFavourites(userId)
      .then(() => {
        this.setState({
          favourites: this.props.favourites
        });
      });
    $('.modal').modal();
  }

  /**
   * @description Handles favourite recipe updates
   * 
   * @param {object} nextProps
   * 
   * @return {undefined}
   * 
   * @memberof FavouriteRecipesList
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      favourites: nextProps.favourites
    });
  }

  /**
   * @description Handles add favourite recipe action
   * 
   * @param {object} event emmited event object
   * 
   * @return {undefined}
   * 
   * @memberof FavouriteRecipesList
  */
  handleRemoveFavourite(event) {
    event.preventDefault();
    const { userId } = this.props.user;
    const recipeId = event.target.dataset['id'];
    const favouriteDetail = {
      userId,
      recipeId
    }
    this.props.removeFavourite(favouriteDetail);
  }

  /**
   * @description return recipes list
   * 
   * @returns {undefined}
   * 
   * @memberof FavouriteRecipesList
  */
  favouritesList() {
    let favouritesChunk = [];
    let chunkSize = 4;

    if (this.state.favourites) {
      for (let i = 0; i < this.state.favourites.length; i += chunkSize) {
        favouritesChunk.push(this.state.favourites.slice(i, i + chunkSize));
      }
    }
    const Row = favouritesChunk.map(chunk => {
      return (
        <div className="row" key={shortId.generate()}>
          {chunk.map(recipe => {
            return (
              <div className="col s12 m6 l3" key={shortId.generate()} >
                <div className="card favouriteCard">
                  <div className="card-image">
                    <Link to={`/recipe/${recipe.id}`}>
                      <img
                        style={{
                          height: '200px'
                        }}
                        src={recipe.imageUrl}
                        alt=''
                      />
                    </Link>
                  </div>
                  <div className="card-content" style={{ padding: '10px' }}>
                    <Link to={`/recipe/${recipe.id}`}>
                      <span
                        className="card_title wrap"
                      >
                        {recipe.title.length > 20
                          ? `${recipe.title.slice(0, 21)}...`
                          : recipe.title
                        }
                      </span>
                    </Link>
                    <p className="card-p wrap">
                      {recipe.description.length > 30
                        ? `${recipe.description.slice(0, 31)}...`
                        : recipe.description}
                    </p>
                  </div>
                  <div className="card-action">
                    <div className="col s4 m8 l8">
                      <Link
                        to="!#"
                        className="tooltipped text-green"
                        style={{ cursor: 'pointer', color: '#999' }}
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Views"
                      >
                        <i className="fa fa-user-circle-o" aria-hidden="true">
                          {' By: '} {recipe.User ? recipe.User.firstName : 0}
                        </i>
                      </Link>
                    </div>
                    <div className="col s4 m4 l4">
                      <Link
                        to="#removeFavourite"
                        onClick={event => {
                          event.preventDefault();
                          this.setState({ recipeId: recipe.id })
                        }}
                        className="tooltipped modal-trigger"
                        style={{ cursor: 'pointer', color: '#999' }}
                        data-position="bottom"
                        data-delay="50"
                        data-tooltip="Delete"
                      >
                        <i className="fa fa-trash-o" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )
    });
    return Row;
  }

  /**
    * @description renders recipes list
    * 
    * @return {undefined}
    * 
    * @memberof FavouriteRecipesList
  */
  render() {
    return (
      <div className="row">
        {/* Remove Favourite list */}
        {
          this.state.favourites === undefined ?
            <div className="center-align"><MDSpinner size={40} /></div>
            :
            this.state.favourites && this.state.favourites.length > 0
              ? this.favouritesList()
              :
              <div>
                <h3 style={{
                  textAlign: "center",
                  color: "#ccc",
                  margin: "100px"
                }}
                >
                  You have not added a favourite recipe yet
                </h3>
              </div>
        }
        <div id="removeFavourite" className="modal">
          <div className="modal-content">
            <h5>Remove Favourite Recipe</h5>
            <p>Are you sure you want to remove this recipe as favourite?</p>
          </div>
          <div className="modal-footer">
            <Link
              to="!#"
              id="remove-favourite"
              data-id={this.state.recipeId}
              onClick={this.handleRemoveFavourite}
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Remove
            </Link>
            <Link
              to="!#"
              onClick={event => {
                event.preventDefault();
              }}
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.recipes.myRecipesError,
    favourites: state.recipes.favouriteRecipes,
    user: state.auth.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getFavourites,
    removeFavourite
  }, dispatch);
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(FavouriteRecipesList);
