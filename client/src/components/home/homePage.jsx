import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import HomeBanner from './HomeBanner.jsx'
import RecipeList from './RecipeList.jsx'
import TopRecipeList from './TopRecipeList.jsx'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header { ...this.props } />
        <HomeBanner />
        <div className="container">
          <div className="row">
            <RecipeList { ...this.props }/>
            <TopRecipeList />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps)(HomePage);
