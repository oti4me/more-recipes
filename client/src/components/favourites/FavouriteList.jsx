import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getFavourites } from '../../actions/favouritesAction';
import shortId from 'shortid';
import header from '../../helper/getHeader';

class MyRecipesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeId: null,
      favourites: []
    };
    this.favouritesList = this.favouritesList.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props.user;
    this.props.getFavourites(userId, (res) => {
      if (res) {
        this.setState({ favourites: this.props.favourites })
      }
    });
    $('.modal').modal();
  }

  handleRemoveFavourite(e) {
    e.preventDefault();
    const { userId } = this.props.user;
    const recipeId = e.target.dataset['id'];
    axios.delete(`/api/v1/users/${userId}/favourites/${recipeId}`, header())
      .then(res => {
        if (res) this.props.getFavourites(userId, () => {
          this.setState({ favourites: this.props.favourites })
        });
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  favouritesList() {
    let favouritesChunk = [];
    let chunkSize = 4;
    for (let i = 0; i < this.state.favourites.length; i += chunkSize) {
      favouritesChunk.push(this.state.favourites.slice(i, i + chunkSize));
    }
    const Row = favouritesChunk.map(chunk => {
      return (
        <div className="row" key={shortId.generate()}>
          {chunk.map(recipe => {
            return (
              <div className="col s12 m3 l3" key={shortId.generate()} >
                <div className="card" style={{ minHeight: '440px' }}>
                  <div className="card-image">
                    <Link to={`/recipe/${recipe.id}`}>
                      <img style={{ height: '230px' }} src={recipe.image} />
                    </Link>
                  </div>
                  <div className="card-content">
                    <Link to={`/recipe/${recipe.id}`}>
                      <span className="card_title" style={{ wordWrap: 'break-word' }}>{recipe.title}</span>
                    </Link>
                    <p className="card-p" style={{ wordWrap: 'break-word' }}>{recipe.description.length > 70 ? `${recipe.description.slice(0, 71)}...` : recipe.description}</p>
                    <hr style={{ borderTop: '1px solid #26a69a' }} />
                    <div className="row">
                      {/* <div className="col s4 m4 l4"> */}
                      <a href="#removeFavourite" onClick={e => { this.setState({ recipeId: recipe.id }) }} className="tooltipped modal-trigger btn" data-position="bottom" data-delay="50" data-tooltip="Remove Favourite">
                        Remove Favourite
                      </a>
                      {/* </div> */}
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

  render() {

    const EmptyList = (
      <div>
        <h4 style={{ textAlign: "center", color: "#ccc", margin: "100px" }}>You have not added a favourite recipe yet</h4>
      </div>
    );

    return (
      <div className="row">
        {/* Remove Favourite list */}
        {this.state.favourites.length > 0 ? this.favouritesList() : EmptyList}
        {/* Remove Favourite modeal */}
        <div id="removeFavourite" className="modal">
          <div className="modal-content">
            <h5>Remove Favourite Recipe</h5>
            <p>Are you sure you want to remove this recipe as favourite?</p>
          </div>
          <div className="modal-footer">
            <a href="#" data-id={this.state.recipeId} onClick={this.handleRemoveFavourite.bind(this)} className="modal-action modal-close waves-effect waves-green btn-flat">Remove</a>
            <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancil</a>
          </div>
        </div>
      </div>
    )
  }
}

MyRecipesList.propTypes = {
  loggedIn: PropTypes.bool,
  myRecipesError: PropTypes.object,
  getFavourites: PropTypes.func,
  favourites: PropTypes.array,

};

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.recipes.myRecipesError,
    favourites: state.recipes.favouriteRecipes,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFavourites }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesList);
