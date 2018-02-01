import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FavouritesList from './FavouriteList';
import { getFavourites } from '../../actions/favouritesAction';
import Pagination from '../Pagination'
import Footer from '../Footer';
import Header from '../Header';

/**
 * @description
 * 
 * @class FavouritesPage
 * 
 * @extends {React.Component}
 */
class FavouritesPage extends Component {

  /**
   * @description Creates an instance of FavouritesPage.
   * 
   * @param {object} props 
   * 
   * @memberof FavouritesPage
   */
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * @description A method that allows a user to create an app in the application
   * 
   * @param {object} page
   * 
   * @returns {undefined} No returned value
   * 
   * @memberof FavouritesPage
  */
  handlePageClick(page) {
    let selected = ++page.selected;
    this.props.getFavourites(selected);
  }

  /**
   * @description
   * 
   * @returns {object} returns favourite recipe page jsx
   * 
   * @memberof FavouritesPage
   */
  render() {
    return (
      <div className="main">
        <Header {...this.props} />
        <div className="container cont">
          <div className="col s12 m12 l12">
            <div className="row">
              <div className="col s12 m6 l9 top-margin-30">
                <h3 className="h-title">Favourite Recipes</h3>
              </div>
            </div>
            <hr style={{ borderTop: "1px solid #26a69a" }} />
            <FavouritesList />
          </div>
        </div>
        <Pagination clickedFrom="favoirite" />
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = (disptach) => {
  return bindActionCreators({
    getFavourites
  }, disptach);
}

const mapStateToProps = (state) => {
  return {
    pagination: state.recipes.pagination
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);
