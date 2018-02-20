import React from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import Header from '../Header';
import RecipeDetail from './RecipeDetail';

/**
 * 
 * @class RecipeDetailPage
 * 
 * @extends {React.Component}
 */
export class RecipeDetailPage extends React.Component {

  /**
   * @description Creates an instance of RecipeDetailPage.
   * 
   * @param {object} props 
   * 
   * @memberof RecipeDetailPage
   */
  constructor(props) {
    super(props);
  }

  /**
   * @description renders recipe detail page
   * 
   * @returns {object} Jsx oject
   * 
   * @memberof RecipeDetailPage
   */
  render() {
    return (
      <div className="main">
        <Header {...this.props} />
        <div
          className="container cont top-margin-50"
          style={{ width: '70%' }}
        >
          <div className="row">
            <RecipeDetail {...this.props} />
            {/* <TopRecipeList /> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipes.recipe
  };
}

export default connect(mapStateToProps)(RecipeDetailPage);
