import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import getMyRecipes from '../../actions/myRecipesActions';
import { deleteRecipe } from '../../actions/deleteRecipe';
import shortId from 'shortid';
import header from '../../helper/getHeader';

class MyRecipesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeId: null,
      myRecipes: []
    };
  }

  componentDidMount() {
    const { userId } = this.props.user;
    this.props.getMyRecipes(userId, () => {
      this.setState({ myRecipes: this.props.myRecipes })
    });
    $('.modal').modal();
    $('.tooltipped').tooltip();
  }

  handleDelete(e) {
    e.preventDefault();
    const id = e.target.dataset['id']
    this.props.deleteRecipe(id)
      .then(res => {
        const { userId } = this.props.user;
        if (res) this.props.getMyRecipes(userId, () => {
          this.setState({ myRecipes: this.props.myRecipes })
        });
      });
  }

  recipeList() {
    let recipeChunk = [];
    let chunkSize = 4;
    for (let i = 0; i < this.state.myRecipes.length; i += chunkSize) {
      recipeChunk.push(this.state.myRecipes.slice(i, i + chunkSize));
    }
    const Row = recipeChunk.map(chunk => {
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
                    <p className="card-p" style={{ wordWrap: 'break-word' }}>
                      {recipe.description.length > 70 ? `${recipe.description.slice(0, 71)}...` : recipe.description}</p>
                    <hr style={{ borderTop: '1px solid #26a69a' }} />
                    <div className="row">
                      <div className="col s4 m4 l4">
                        <a className="tooltipped text-green"
                          style={{ cursor: 'pointer', color: '#999' }}
                          data-position="bottom" data-delay="50" data-tooltip="Views">
                          <i className="material-icons text-green">visibility</i> {recipe.viewCount}
                        </a>
                      </div>
                      <div className="col s4 m4 l4">
                        <Link to={`/updaterecipe/${recipe.id}`}
                          className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Edit" style={{ color: '#999' }}>
                          <i className="material-icons text-green">edit</i>
                        </Link>
                      </div>
                      <div className="col s4 m4 l4">
                        <a href="#delete" onClick={e => { this.setState({ recipeId: recipe.id }) }}
                          className="tooltipped modal-trigger" style={{ cursor: 'pointer', color: '#999' }}
                          data-position="bottom" data-delay="50" data-tooltip="Delete">
                          <i className="material-icons text-green">delete</i>
                        </a>
                      </div>
                    </div>
                    <hr style={{ borderTop: '1px solid #26a69a' }} />
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
        <h3 style={{ textAlign: "center", color: "#ccc", margin: "100px" }}>
          You have not added a recipe yet
        </h3>
      </div>
    );

    return (
      <div className="row">
        {/* <div className='row'> */}
        {/* my recipe list */}
        {this.state.myRecipes.length > 0 ? this.recipeList() : EmptyList}
        {/* </div> */}
        {/* delete modeal */}
        <div id="delete" className="modal">
          <div className="modal-content">
            <h5>Delete Recipe</h5>
            <p>Are you sure you want to delete this recipe?</p>
          </div>
          <div className="modal-footer">
            <a href="#" data-id={this.state.recipeId} onClick={this.handleDelete.bind(this)}
              className="modal-action modal-close waves-effect waves-green btn-flat">Delete</a>
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
  getMyRecipes: PropTypes.func,
  myRecipes: PropTypes.array,

};

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.recipes.myRecipesError,
    myRecipes: state.recipes.myRecipes,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMyRecipes,
    deleteRecipe
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesList);
