import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getMostVotedRecipes from '../../actions/getMostVotedRecipes'

/**
 * 
 * @class TopRecipeList
 * 
 * @extends {Component}
 */
class TopRecipeList extends Component {

  /**
   * @description Creates an instance of TopRecipeList.
   * 
   * @param {obect} props 
   * 
   * @memberof TopRecipeList
   */
  constructor(props) {
    super(props);
    this.state = {
      topRecipes: undefined
    }
  }

  /**
   * @description get top recipes array
   * 
   * @returns {undefined} No returned value
   * 
   * @memberof TopRecipeList
   */
  componentDidMount() {
    this.props.getMostVotedRecipes();
  }

  /**
  * @description update state with latest props
  * 
  * @param {object} nextProps
 
  * @returns {undefined} nextProps
  * 
  * @memberof TopRecipeList
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      upvotedRecipes: nextProps.upvotedRecipes
    });
  }

  /**
   * @description renders top recipe list
   * 
   * @returns {JSX} returns jsx for top recipe page
   * 
   * @memberof TopRecipeList
   */
  render() {
    return (
      <div className="col s12 m2 l2 top-margin">
        <h6 style={{
          fontWeight: 'bold',
          color: '#999',
          fontSize: '18px'
        }}
        >
          You may also like
        </h6>
        <div className="row">
          {
            this.state.upvotedRecipes
              ? this.state.upvotedRecipes.slice(0, 2).map(recipe => (
                <div className="col s12 m12 l12" key={recipe.id} >
                  <div className="card">
                    <div className="card-image">
                      <img src={recipe.imageUrl} alt="" />
                    </div>
                    <div className="card-content">
                      <h5 className="card-p">{recipe.title}</h5>
                    </div>
                  </div>
                </div>
              ))
              : ''
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    upvotedRecipes: state.recipes.upvotedRecipes
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMostVotedRecipes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopRecipeList);
