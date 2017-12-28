import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import shortId from 'shortid';

import Data from '../../../../server/mockapi/data';
import { getAllRecipe } from '../../actions/RecipeAction';

const header = ({
  headers: {
    'x-access-token': window.localStorage.userToken,
    authorization: window.localStorage.userToken
  }
});

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      pages: 1,
      page: 1,
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  handleAddFavourite(e) {
    e.preventDefault();
    const userId = this.props.user.userId;
    const recipeId = e.target.dataset['id'];
    axios.post('/api/v1/users/' + userId + '/recipes', { recipeId: recipeId }, header)
      .then(res => {
        Materialize.toast("Added to favourite list", 3000, 'green');
      });
  }


  getRecipes(data = {}) {
    axios.get('/api/v1/recipes', data, header)
      .then(res => {
        this.setState({
          recipes: res.data.recipes,
          pages: res.data.pages
        });
      })
      .catch(error => {

      });
  }

  handlePagination(e) {
    e.preventDefault()
    let page = e.target.dataset['page'];
    this.setState({
      page: page
    });
    this.getRecipes({ page: this.state.page });
  }

  pagination() {
    let pages = [];
    for (let i = 1; i <= this.state.pages; i++) {
      pages.push(
        <li className="" key={i}>
          <a href="" data-page={i} onClick={this.handlePagination.bind(this)} className={this.state.page === i ? "color-green" : ''}>{i}</a>
        </li>
      )
    }
    return (
      pages.map(list => {
        return list;
      })
    )
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
              <div className="col s12 m4 l4" key={shortId.generate()}>
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
                    <span className="bold text-gray">By: {recipe.User.firstname} {recipe.User.lastname}</span>
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
        <ul className="pagination" style={{ textAlign: "center" }}>
          <li className="disabled">
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          {this.pagination()}
          <li className="waves-effect disabled">
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  };
}


export default connect(mapStateToProps, { getAllRecipe })(RecipeList);
