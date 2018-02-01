import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortId from 'shortid';
import MDSpinner from "react-md-spinner";
import getMyRecipes from '../../actions/getMyRecipes';
import { deleteRecipe } from '../../actions/deleteRecipe';

/**
 * 
 * @class MyRecipesList
 * 
 * @extends {React.Component}
 */
class MyRecipesList extends React.Component {

  /**
   * @description Creates an instance of MyRecipesList.
   * 
   * @param {object} props 
   * 
   * @memberof MyRecipesList
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeId: null,
      myRecipes: undefined
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * @description
   * 
   * @returns {undefined}
   * 
   * @memberof MyRecipesList
   */
  componentDidMount() {
    const { user: { userId } } = this.props;
    console.log('user ID === >', userId);
    this.props.getMyRecipes(userId)
      .then(() => {
        this.setState({
          myRecipes: this.props.myRecipes
        });
      });
    $('.modal').modal();
    $('.tooltipped').tooltip();
  }

  /**
   * @description
   * 
   * @param {object} nextProp new state object
   * 
   * @returns {undefined}
   * 
   * @memberof MyRecipesList
   */
  componentWillReceiveProps(nextProp) {
    this.setState({
      myRecipes: nextProp.myRecipes
    });
  }

  /**
   * @description
   * 
   * @param {object} event event object
   * 
   * @returns {undefined}
   * 
   * @memberof MyRecipesList
   */
  handleDelete(event) {
    event.preventDefault();
    const id = event.target.dataset['id'];
    this.props.deleteRecipe(id)
  }

  /**
    * @description Render my recipe list
    *    
    * @returns {obect} jsx object to render my recipe list
    * 
    * @memberof MyRecipesList
    */
  recipeList() {

    const style = {
      maxHeight: '350px',
      minHeight: '350px',
      overflow: 'hidden'
    }
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
              <div className="" key={shortId.generate()}>
                <div className="col s12 m6 l3" key={shortId.generate()} >
                  <div className="card" style={style}>
                    <div className="card-image">
                      <Link to={`/recipe/${recipe.id}`}>
                        <img
                          style={{ height: '200px' }}
                          src={recipe.imageUrl}
                          alt=''
                        />
                      </Link>
                    </div>
                    <div
                      className="card-content"
                      style={{
                        padding: '10px',
                        maxHeight: '100px',
                        overflow: 'hidden'
                      }}
                    >
                      <Link to={`/recipe/${recipe.id}`}>
                        <span
                          className="card_title"
                          style={{ wordWrap: 'break-word' }}
                        >
                          {recipe.title}
                        </span>
                      </Link>
                      <p className="card-p" style={{ wordWrap: 'break-word' }}>
                        {recipe.description.length > 30
                          ? `${recipe.description.slice(0, 31)}...`
                          : recipe.description}
                      </p>
                    </div>
                    <div className="card-action">
                      <div className="col s4 m4 l4">
                        <a
                          className="tooltipped text-green"
                          style={{ cursor: 'pointer', color: '#999' }}
                          data-position="bottom"
                          data-delay="50"
                          data-tooltip="Views"
                        >
                          <i className="fa fa-eye" aria-hidden="true">
                            {' '}{recipe.viewCount}
                          </i>
                        </a>
                      </div>
                      <div className="col s4 m4 l4">
                        <Link
                          to={`/updaterecipe/${recipe.id}`}
                          className="tooltipped"
                          data-position="bottom"
                          data-delay="50"
                          data-tooltip="Edit"
                          style={{ color: '#999' }}
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                      <div className="col s4 m4 l4">
                        <a
                          href="#delete"
                          onClick={event => {
                            event.preventDefault();
                            this.setState({
                              recipeId: recipe.id
                            })
                          }}
                          className="tooltipped modal-trigger"
                          style={{ cursor: 'pointer', color: '#999' }}
                          data-position="bottom"
                          data-delay="50"
                          data-tooltip="Delete"
                        >
                          <i className="fa fa-trash-o" aria-hidden="true" />
                        </a>
                      </div>
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
   * @description
   * 
   * @returns {JSX} JSX
   * 
   * @memberof MyRecipesList
   */
  render() {
    return (
      <div className="row">
        {/* my recipe list */}
        {
          this.state.myRecipes === undefined ?
            <div className="center-align"><MDSpinner size={40} /></div>
            :
            this.state.myRecipes && this.state.myRecipes.length > 0
              ? this.recipeList()
              :
              <div>
                <h3 style={{
                  textAlign: "center",
                  color: "#ccc",
                  margin: "100px"
                }}
                >
                  You have not added a recipe yet
                </h3>
              </div>
        }
        {/* delete modeal */}
        <div id="delete" className="modal">
          <div className="modal-content">
            <h5>Delete Recipe</h5>
            <p>Are you sure you want to delete this recipe?</p>
          </div>
          <div className="modal-footer">
            <a
              href="!#"
              data-id={this.state.recipeId}
              onClick={this.handleDelete}
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Delete
            </a>
            <a
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Cancil
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth: {
    loggedIn, user
  },
    recipes: {
      myRecipesError,
      myRecipes
    }
  }
    = state;
  return {
    loggedIn,
    myRecipes,
    user,
    error: myRecipesError,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMyRecipes,
    deleteRecipe
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesList);
