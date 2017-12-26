import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../Footer.jsx';
import Header from '../Header.jsx';
import RecipeDetail from './RecipeDetail.jsx';
import TopRecipeList from './TopRecipeList.jsx';

class RecipeDetailPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header { ...this.props } />
        <div className="container top-margin-50">
          <div className="row">
            <RecipeDetail { ...this.props } />
            <TopRecipeList />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(RecipeDetailPage);
