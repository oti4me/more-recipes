import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MyRecipesList from './MyRecipesList'
import myRecipes from '../../actions/getMyRecipes'
import Footer from '../Footer'
import Header from '../Header'
import Pagination from '../Pagination'

/**
 * 
 * 
 * @class MyRecipesPage
 * 
 * @extends {Component}
 */
class MyRecipesPage extends Component {

  /**
   * @description Creates an instance of MyRecipesPage.
   * 
   * @param {objevt} props 
   * 
   * @memberof MyRecipesPage
   */
  constructor(props) {
    super(props);
  }

  /**
   * @description
   * 
   * @returns {object} returns jsx object my recipies page
   * 
   * @memberof MyRecipesPage
   */
  render() {
    return (
      <div className="main">
        <Header {...this.props} />
        <div className="container cont">
          <div className="col s12 m12 l12">
            <div className="row">
              <div className="col s12 m9 l9">
                <h3 className="h-title">My Recipes</h3>
              </div>
              <div className="col s12 m3 l3 top-margin-50">
                <Link
                  to="/addrecipe"
                  className="waves-effect waves-light btn top-margin"
                >
                  Add Recipe
                </Link>
              </div>
            </div>
            <hr style={{ borderTop: "1px solid #26a69a" }} />
            <MyRecipesList />
          </div>
        </div>
        <Pagination />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps, { myRecipes })(MyRecipesPage);
