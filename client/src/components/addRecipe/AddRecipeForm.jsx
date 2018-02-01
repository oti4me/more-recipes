import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MDSpinner from "react-md-spinner";
import addRecipe from '../../actions/addRecipeAction';
import validator from '../../helper/validator';
import sampleImage from '../../../public/images/no-preview-available.png';

/**
 * @description
 * 
 * @class AddRecipeForm
 * 
 * @extends {Component}
 */
class AddRecipeForm extends Component {

  /**
   * @description Creates an instance of AddRecipeForm.
   * 
   * @param {object} props 
   * 
   * @memberof AddRecipeForm
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      ingredients: '',
      direction: '',
      description: '',
      imageSrc: sampleImage,
      imageUrl: '',
    };
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  /**
   * @description Handles add recipe action
   * 
   * @param  {object} event Click event
   * 
   * @return {undefined}
   */
  handleAddRecipe(event) {
    event.preventDefault();
    const errors = validator.validateAddRecipe(this.state);
    if (errors.length > 0) {
      errors.map(error => {
        Materialize.toast(error.message, 3000, 'red');
      });
      return;
    }

    this.props.addRecipe(this.state, Materialize, this.props.history);
  }

  /**
   * @description Handles image form field change
   * 
   * @param {object} event event object
   * 
   * @returns {undefined} 
   * 
   * @memberof AddRecipeForm
   */
  handleImageChange(event) {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      this.setState({
        [event.target.name]: event.target.files[0]
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ imageSrc: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({ imageSrc: sampleImage });
    }
  }

  /**
   * @description Handles changes on the form fields
   * 
   * @param {object} event
   * 
   * @return {undefined}
   * 
   * @memberof AddRecipeForm
   */
  handleFieldChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description Return jsx object for add recipe form
   * 
   * @returns {object} returns add recipe form jsx
   * 
   * @memberof AddRecipeForm
   */
  render() {
    return (
      <div className="row">
        <h4 className="top-margin-40">Add Recipe</h4>
        <hr />
        <div className="col s12 m4 l4 ">
          <div className="input-field col s12">
            <input
              id="title"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
            <label htmlFor="title">Name of Recipe</label>
          </div>
          <div className="input-field col s12" >
            <input
              id="description"
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleFieldChange}
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className="input-field col s12" >
            <textarea
              id="ingredients"
              className="materialize-textarea"
              name="ingredients"
              value={this.state.ingredients}
              onChange={this.handleFieldChange}
            />
            <label htmlFor="ingredients" >Ingredients</label>
          </div>
          <div className="input-field col s12">
            <textarea
              id="direction"
              className="materialize-textarea"
              name="direction"
              value={this.state.direction}
              onChange={this.handleFieldChange}
            />
            <label htmlFor="direction">Direction</label>
          </div>
          <div className="file-field input-field col s12" >
            <div className="btn color-dark-gray">
              <span>Image</span>
              <input
                name="imageUrl"
                onChange={this.handleImageChange}
                id="img"
                type="file"
                multiple
              />
            </div>
            <div className="file-path-wrapper">
              <input
                type="text"
                placeholder="Select Recipe Image"
                className="file-path validate"
                name=""
              />
              <input type="hidden" name="action" />
            </div>
          </div>
          <br /><br />
          <div className="input-field col s12">
            <a
              href="!#"
              className="waves-effect waves-light btn"
              style={{ marginRight: '15px' }}
              onClick={this.handleAddRecipe}
            >
              Add Recipe
            </a>
            {this.props.isRequesting ? <MDSpinner size={40} /> : ''}
            <br /><br />
          </div>
        </div>
        <div className="col s12 m4 l4">
          <div className="img2 top-margin-40">
            <img
              style={{
                color: "#fff",
                width: "300px",
                height: "400px",
                maxWidth: "300px",
                maxHeight: "300px"
              }}
              src={this.state.imageSrc}
              id="img3"
              alt="."
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    recipes: state.recipes,
    isRequesting: state.recipes.isRequesting
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addRecipe,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeForm);
