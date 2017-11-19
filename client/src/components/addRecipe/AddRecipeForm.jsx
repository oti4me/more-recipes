import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { addRecipe } from '../../actions/RecipeAction';

class AddRecipeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title : "",
      ingredients : "",
      direction : "",
      description : "",
      image : "",
      userId: this.props.state.userId
    }
  }

  handleAddRecipe(e) {
    // validte state data

    console.log(this.state)
    this.props.addRecipe(this.state, this.props.history, Materialize)
      .catch(error => {
        if(error.response.status === 400){
          error.response.data.message.map( err => {
            Materialize.toast(err.msg, 5000, 'red');
          });
        }else if(error.response.status === 401){
          console.log(error.response);
        }else{
          console.log(error);
        }
      });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render() {

    return (
      <div className="row">
        <h4 className="top-margin-40">Add Recipe</h4>
        <hr />
        <div className="col s12 m4 l4 ">
          <div className="input-field col s12">
            <input id="title" type="text" name="title" value={ this.state.title } onChange={ this.handleChange.bind(this) }/>
            <label htmlFor="title">Name of Recipe</label>
          </div>
          <div className = "input-field col s12" > 
            <input id="description" name="description" type="text" value={ this.state.description } onChange={ this.handleChange.bind(this) } />
            <label htmlFor="description">Description</label>
          </div>
          <div className = "input-field col s12" > 
            <textarea id="ingredients" className="materialize-textarea" name="ingredients" value={ this.state.ingredients } onChange={ this.handleChange.bind(this) }></textarea> 
            <label htmlFor = "ingredients" >Ingredients</label>
          </div> 
          <div className="input-field col s12">
            <textarea id="direction" className="materialize-textarea" name="direction" value={ this.state.direction } onChange={ this.handleChange.bind(this) }></textarea>
            <label htmlFor="direction">Direction</label>
          </div> 
          <div className = "file-field input-field col s12" > 
            <div className="btn color-dark-gray">
              <span>Image</span>
              <input name="image" value={ this.state.image } onChange={ this.handleChange.bind(this) } id="img" type="file" multiple />
            </div>
            <div className="file-path-wrapper">
              <input type="text" placeholder="Select Recipe Image" className="file-path validate" name="" />
              <input type="hidden" name="action" value={this.state.id} ref={(input) => { this.actionInput = input }} />
            </div>
          </div>
          <br /><br />
          <div className="input-field col s12">
            <a className="waves-effect waves-light btn" onClick={ this.handleAddRecipe.bind(this) }>Add Recipe</a><br/><br/>
          </div>
        </div>
        <div className="col s12 m4 l4">
          <div className="img2 top-margin-40">
            <img style={{ color: "#fff", width: "300px", height: "400px", maxWidth: "300px", maxHeight: "300px" }} src="/images/8.jpg" id="img3" alt="." />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state : state.auth.user };
}

export default connect(mapStateToProps, { addRecipe })(AddRecipeForm);
