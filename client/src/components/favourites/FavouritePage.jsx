import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import FavouritesList from './FavouriteList.jsx';
import Footer from '../Footer.jsx';
import Header from '../Header.jsx';
import Pagination from '../pagination.jsx';

class FavouritesPage extends React.Component {

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
              <div className="col s12 m9 l9 top-margin-30">
                <h3 className="h-title">Favourite Recipes</h3>
              </div>
              <div className="col s12 m3 l3 top-margin-50">
                <div className="input-field col s12">
                  <i className="material-icons prefix">search</i>
                  <input id="search" type="text" />
                  <label htmlFor="search">Enter Keyword</label>
                </div>
              </div>
            </div>
            <hr style={{ borderTop: "1px solid #26a69a" }} />
            <FavouritesList />
            {/* pagination */}
            <Pagination pages={1} />
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

export default connect(mapStateToProps)(FavouritesPage);
