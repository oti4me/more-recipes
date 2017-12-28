import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import MyRecipesList from './MyRecipesList.jsx'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'

class MyRecipesPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Header { ...this.props } />
        <div className="container">
          <div className="col s12 m12 l12">
            <div className="row">
              <div className="col s12 m5 l5">
                <h3 className="h-title">My Recipes</h3>
              </div>
              <div className="col s12 m4 l4 top-margin-30">
                <div className="input-field col s12">
                  <i className="material-icons prefix">search</i>
                  <input id="search" type="text" />
                  <label htmlFor="search">Enter Keyword</label>
                </div>
              </div>
              <div className="col s12 m3 l3 top-margin-50">
                <a href="/addrecipe" className="waves-effect waves-light btn top-margin">Add Recipe</a>
              </div>
            </div>
            <hr style={{ borderTop: "1px solid #26a69a" }} />
            <MyRecipesList />
            {/* pagination */}
            <ul className="pagination" style={{ textAlign: "center" }}>
              <li className="disabled">
                <a href="#!">
                  <i className="material-icons">chevron_left</i>
                </a>
              </li>
              <li className="active">
                <a href="#!" className="color-green">1</a>
              </li>
              <li className="waves-effect disabled">
                <a href="#!">
                  <i className="material-icons">chevron_right</i>
                </a>
              </li>
            </ul>
            {/* end of pagination */}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps)(MyRecipesPage);
