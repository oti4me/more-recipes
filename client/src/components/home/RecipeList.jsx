import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import shortId from 'shortid';

import Data from '../../../../server/mockapi/data';
import { getAllRecipes } from '../../actions/recipes';
import { addFavourite } from '../../actions/favouritesAction';
import { getFavourites } from '../../actions/favouritesAction';
import header from '../../helper/getHeader';
import Pagination from '../pagination.jsx';

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      pages: 1,
    };
    this.handleAddFavourite = this.handleAddFavourite.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  handleAddFavourite(e) {
    e.preventDefault();
    const { userId } = this.props.user;
    const recipeId = Number(e.target.dataset['id']);
    this.props.addFavourite({ userId, recipeId }, (res) => {
      if (res) {
        return Materialize.toast('Added to favourites', 3000, 'green');
      } else {
        const { errors } = this.props;
        console.log(errors);
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

  getRecipes(data = {}) {
    axios.get('/api/v1/recipes', data, header())
      .then(res => {
        this.setState({
          recipes: res.data.recipes,
          pages: res.data.pages
        });
      })
      .catch(error => {

      });
  }

  recipeList() {
    let recipeChunk = [];
    let chunkSize = 3;
    for (let i = 0; i < this.state.recipes.length; i += chunkSize) {
      recipeChunk.push(this.state.recipes.slice(i, i + chunkSize));
    }
    const i = 1;
    const Row = recipeChunk.map(chunk => {
      return (
        <div className="row" key={shortId.generate()}>
          {chunk.map(recipe => {
            return (
              <div className="col s12 m6 l4" key={shortId.generate()}>
                <div className="card">
                  <div className="card-image">
                    <Link to={`/recipe/${recipe.id}`}>
                      <img style={{ width: '100%', height: '200px' }} src={recipe.image} />
                    </Link>
                    {
                      this.props.loggedIn ? <a href="" onClick={this.handleAddFavourite.bind(this)} className="btn-floating halfway-fab waves-effect waves-light red">
                        <i data-id={recipe.id} className="material-icons color-green">favorite</i>
                      </a> : ""
                    }
                  </div>
                  <div className="card-content">
                    <Link to={`/recipe/${recipe.id}`}>
                      <span className="card_title" style={{ wordWrap: 'break-word' }}>{recipe.title}</span>
                    </Link>
                    <p className="card-p" style={{ wordWrap: 'break-word' }}>{recipe.description.length > 70 ? `${recipe.description.slice(0, 71)}...` : recipe.description}</p>
                    <hr style={{ borderTop: "1px solid #26a69a" }} />
                    <div className="row">
                      <div className="col s4 m3 l3">
                        <a className="tooltipped text-green" style={{ color: '#999' }} data-position="bottom" data-delay="50" data-tooltip="Views">
                          <i className="material-icons text-green">visibility</i> {recipe.viewCount}
                        </a>
                      </div>
                      <div className="col s4 m3 l3">
                        <a className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Upvotes" style={{ color: '#999' }}>
                          <i className="material-icons text-green">thumb_up</i> {recipe.upvotes}
                        </a>
                      </div>
                      <div className="col s4 m3 l3">
                        <a className="tooltipped modal-trigger" style={{ ccolor: '#999' }} data-position="bottom" data-delay="50" data-tooltip="Downvotes">
                          <i className="material-icons text-green">thumb_down</i> {recipe.downvotes}
                        </a>
                      </div>
                      <div className="col s4 m3 l3">
                        <a className="tooltipped modal-trigger" style={{ color: '#999' }} data-position="bottom" data-delay="50" data-tooltip="Reviews">
                          <i className="material-icons text-green">rate_review</i> {recipe.Reviews ? recipe.Reviews.length : 0}
                        </a>
                      </div>
                    </div>
                    <hr style={{ borderTop: "1px solid #26a69a" }} />
                    <span className="bold text-gray">By: {recipe.User ? recipe.User.firstname : ''} {recipe.User ? recipe.User.lastname : ''}</span>
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
    return (
      <div>
        {this.recipeList()}
        <Pagination pages={this.state.pages} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    errors: state.recipes.errors,
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { getAllRecipes, addFavourite, getFavourites })(RecipeList);
