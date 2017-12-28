import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
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
        <div className="container" style={{ marginBottom: '50px' }}>
          <div className="row">
            <div className="col s12 m10 l10" >
              <div className="row">
                <div className="col s12 m8 l8">
                  <h3 className="" style={{ fontSize: "34px", marginTop: '50px' }}>Recent Recipes</h3>
                </div>
                <div className="col s12 m4 l4 top-margin-30">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input id="search" type="text" />
                    <label htmlFor="search">Enter Keyword</label>
                  </div>
                </div>
              </div>
              < hr style={{ borderTop: "1px solid #26a69a" }} />
              <RecipeList { ...this.props } />
            </div>
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
