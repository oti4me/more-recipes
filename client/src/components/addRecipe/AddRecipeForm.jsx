import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import addRecipe from '../../actions/addRecipeAction';
import MDSpinner from "react-md-spinner";

class AddRecipeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      ingredients: '',
      direction: '',
      description: '',
      imageSrc: '/images/8.jpg',
      image: '',

      userId: this.props.user.userId
    }
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleAddRecipe(e) {
    this.props.addRecipe(this.state, () => {
      const { recipes } = this.props;
      if (recipes.added) {
        Materialize.toast(recipes.message, 3000, 'green');
        this.props.history.push('/myrecipes');
      }
      else {
        const { error } = recipes;
        if (error) {
          if (error.status === 400) {
            error.data.message.map(err => {
              Materialize.toast(err.msg, 4000, 'red');
            });
          } else if (error.status === 409) {
            Materialize.toast(error.data.message, 4000, 'red');
          } else {
            Materialize.toast(error, 4000);
          }
        }
      }
    });
  }

  handleImageChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      this.setState({
        [e.target.name]: e.target.files[0]
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ imageSrc: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      this.setState({ imageSrc: '/images/8.jpg', imageFile: '' });
    }
  }

  handleFieldChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  indicator() {
    return (
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="row">
        <h4 className="top-margin-40">Add Recipe</h4>
        <hr />
        <div className="col s12 m4 l4 ">
          <div className="input-field col s12">
            <input id="title" type="text" name="title" value={this.state.title} onChange={this.handleFieldChange} />
            <label htmlFor="title">Name of Recipe</label>
          </div>
          <div className="input-field col s12" >
            <input id="description" name="description" type="text" value={this.state.description} onChange={this.handleFieldChange} />
            <label htmlFor="description">Description</label>
          </div>
          <div className="input-field col s12" >
            <textarea id="ingredients" className="materialize-textarea" name="ingredients" value={this.state.ingredients} onChange={this.handleFieldChange}></textarea>
            <label htmlFor="ingredients" >Ingredients</label>
          </div>
          <div className="input-field col s12">
            <textarea id="direction" className="materialize-textarea" name="direction" value={this.state.direction} onChange={this.handleFieldChange}></textarea>
            <label htmlFor="direction">Direction</label>
          </div>
          <div className="file-field input-field col s12" >
            <div className="btn color-dark-gray">
              <span>Image</span>
              <input name="image" onChange={this.handleImageChange} id="img" type="file" multiple />
            </div>
            <div className="file-path-wrapper">
              <input type="text" placeholder="Select Recipe Image" className="file-path validate" name="" />
              <input type="hidden" name="action" />
            </div>
          </div>
          <br /><br />
          <div className="input-field col s12">
            <a className="waves-effect waves-light btn" style={{ marginRight: '15px' }} onClick={this.handleAddRecipe}>Add Recipe</a>

            {this.props.recipes.isRequesting ? <MDSpinner size={40} /> : ''}

            <br /><br />
          </div>
        </div>
        <div className="col s12 m4 l4">
          <div className="img2 top-margin-40">
            <img style={{ color: "#fff", width: "300px", height: "400px", maxWidth: "300px", maxHeight: "300px" }} src={this.state.imageSrc} id="img3" alt="." />
          </div>
        </div>
      </div>
    )
  }
}

AddRecipeForm.propTypes = {
  user: PropTypes.object,
  recipes: PropTypes.object,
  addRecipe: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    recipes: state.recipes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addRecipe }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeForm);
