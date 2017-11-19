import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import { updateRecipe } from '../../actions/RecipeAction';

const header = ({ 
  headers: { 
    'x-access-token' : window.localStorage.userToken,
    authorization : window.localStorage.userToken 
  } 
});

class UpdateRecipeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title : "",
      ingredients : "",
      direction : "",
      description : "",
      image : "",
    }
  }

  componentWillMount(){
    this.getData();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  getData(){
    const id = this.props.match.params.id;
    axios.get('/api/v1/recipes/'+id, {}, header)
    .then(res => {
      console.log(res.data.data);
      const { title, ingredients, direction, description, image } = res.data.data
      this.setState({
        title : title,
        ingredients : ingredients,
        direction : direction,
        description : description,
        image : image
     })
    })
  }
    
  handleUpdateRecipe() {
    const id = this.props.match.params.id;
    axios.put('/api/v1/recipes/'+id, this.state, header)
    .then(res => {
      console.log(res)
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="row">
    <h4 className="top-margin-40">Edit Recipe</h4>
    <hr />
    <div className="col s12 m4 l4 ">
      <div className="input-field col s12">
        <input id="title" type="text" name="title" defaultValue={ this.state.title } onChange={ this.handleChange.bind(this) } />
        <label htmlFor="title">Name of Recipe</label>
      </div>
      <div className = "input-field col s12" > 
        <input id="description" name="description" type="text"  defaultValue={ this.state.description } onChange={ this.handleChange.bind(this) } />
        <label htmlFor="description">Description</label>
      </div>
      <div className = "input-field col s12" > 
        <textarea id="ingredients" className="materialize-textarea"  name="ingredients" defaultValue={ this.state.ingredients } onChange={ this.handleChange.bind(this) }></textarea> 
        <label htmlFor = "ingridience" >Ingrdience</label>
      </div> 
      <div className="input-field col s12">
        <textarea id="direction" className="materialize-textarea"  name="direction" defaultValue={ this.state.direction } onChange={ this.handleChange.bind(this) }></textarea>
        <label htmlFor="direction">Direction</label>
      </div> 
      <div className = "file-field input-field col s12" > 
        <div className="btn color-dark-gray">
          <span>Image</span>
          <input id="img" type="file" multiple  name="image" defaultValue={ this.state.image } onChange={ this.handleChange.bind(this) } />
        </div>
        <div className="file-path-wrapper">
          <input type="text" placeholder="Select Recipe Image" className="file-path validate" name="" />
        </div>
      </div>
      <br /><br />
      <div className="input-field col s12">
        <a className="waves-effect waves-light btn" onClick={ this.handleUpdateRecipe.bind(this) } >Edit Recipe</a><br/><br/>
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
  return { state };
}

export default connect(mapStateToProps, { updateRecipe })(UpdateRecipeForm);
