import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MDSpinner from "react-md-spinner";
import updateRecipe from '../../actions/updateRecipe';
import { getRecipe } from '../../actions/recipeDetails';

/**
 * 
 * 
 * @class UpdateRecipeForm
 * @extends {Component}
 */
class UpdateRecipeForm extends Component {

  /**
   * Creates an instance of UpdateRecipeForm.
   * @param {undefined} props 
   * @memberof UpdateRecipeForm
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      ingredients: '',
      direction: '',
      description: '',
      imageUrl: '',
      isImageChanged: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  /**
    * @description a method to handle update on props change
    * 
    * @param {object} nextProps new state object
    * 
    * @returns {undefined} 
    * 
    * @memberof UpdateRecipeForm
  */
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getRecipe(id);
  }

  /**
    * @description a method to handle state update on props change
    * 
    * @param {object} nextProps new state object
    * 
    * @returns {undefined} 
    * 
    * @memberof UpdateRecipeForm
    */
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe) {
      const {
        title,
        ingredients,
        direction,
        description,
        imageUrl,
      } = nextProps.recipe;

      this.setState({
        title,
        ingredients,
        direction,
        description,
        imageUrl
      });
    }
    if (nextProps.updatedRecipe) {
      const {
        title,
        ingredients,
        direction,
        description,
        imageUrl,
      } = nextProps.updatedRecipe;

      this.setState({
        title,
        ingredients,
        direction,
        description,
        imageUrl
      });
    }
  }

  /**
    * @description a method to handle image field change
    * 
    * @param {object} event event object
    * 
    * @returns {undefined}
    * 
    * @memberof UpdateRecipeForm
    */
  handleImageChange(event) {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      this.setState({
        [event.target.name]: event.target.files[0],
        isImageChanged: true
      });
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({
          imageUrl: event.target.result
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({
        imageUrl: '/images/no-preview-available.png'
      });
    }
  }

  /**
   * @description a method to handle field change
   * 
   * @param {object} event event object
   * 
   * @returns {undefined}
   * 
   * @memberof UpdateRecipeForm
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
    * @description a method to handle recipe update
    * 
    * @param {object} event event object
    * 
    * @returns {undefined}
    * 
    * @memberof UpdateRecipeForm
  */
  handleUpdateRecipe(event) {
    event.preventDefault();
    const id = this.props.match.params.id;
    this.props.updateRecipe(id, this.state, Materialize);
  }

  /**
    * @description a method to handle recipe update
    * 
    * @returns {undefined}
    * 
    * @memberof UpdateRecipeForm
  */
  render() {
    const style = {
      color: "#fff",
      width: "300px",
      height: "400px",
      maxWidth: "300px",
      maxHeight: "300px"
    }

    return (
      <div className="row" >
        <h4 className="top-margin-40">Edit Recipe</h4>
        <hr />
        <form onSubmit={this.handleUpdateRecipe}>
          <div className="col s12 m4 l4 ">
            <div className="input-field col s12">
              <input
                className="active"
                id="title"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <label htmlFor="title" className="active">Name of Recipe</label>
            </div>
            <div className="input-field col s12" >
              <input
                className="active"
                id="description"
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <label htmlFor="description" className="active">Description</label>
            </div>
            <div className="input-field col s12" >
              <textarea
                id="ingredients"
                className="materialize-textarea active"
                name="ingredients"
                value={this.state.ingredients}
                onChange={this.handleChange}
              />
              <label htmlFor="ingridience" className="active">Ingrdients</label>
            </div>
            <div className="input-field col s12">
              <textarea
                id="direction"
                className="materialize-textarea active"
                name="direction"
                value={this.state.direction}
                onChange={this.handleChange}
              />
              <label htmlFor="direction" className="active">Direction</label>
            </div>
            <div className="file-field input-field col s12" >
              <div className="btn color-dark-gray">
                <span>Image</span>
                <input
                  className="active"
                  id="img"
                  type="file"
                  name="image"
                  onChange={this.handleImageChange}
                />
              </div>
              <div className="file-path-wrapper">
                <input
                  type="text"
                  placeholder="Select Recipe Image"
                  className="file-path validate active"
                  name=""
                />
              </div>
            </div>
            <br /><br />
            <div className="input-field col s12">
              <Link
                to="#"
                className="waves-effect waves-light btn"
                onClick={this.handleUpdateRecipe}
              >
                Edit Recipe
              </Link>
              {this.props.isRequesting ? <MDSpinner size={40} /> : ''}
              <br /><br />
            </div>
          </div>
        </form>
        <div className="col s12 m4 l4">
          <div className="img2 top-margin-40">
            <img style={style} src={this.state.imageUrl} id="img3" alt="." />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipes.recipe,
    updatedRecipe: state.recipes.updatedRecipe,
    isRequesting: state.recipes.isRequesting
  };
}

export default connect(mapStateToProps, {
  updateRecipe,
  getRecipe
})(UpdateRecipeForm);
