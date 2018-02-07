import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeBanner from './HomeBanner';
import Footer from '../Footer';
import Header from '../Header';
import search from '../../actions/search';
import { getRecipes } from '../../actions/getAllRecipes';
import Tabs from './Tabs';

/**
 * 
 * @class HomePage
 * 
 * @extends {Component}
 */
class HomePage extends Component {

  /**
   * @description Creates an instance of HomePage.
   * 
   * @param {object} props 
   * 
   * @memberof HomePage
   */
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      pageLimit: 6,
      allRecipes: [],
      searchedRecipes: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * @description get all recipes and update state
   * 
   * @returns {void} No returned value
   * 
   * @memberof HomePage
   */
  componentDidMount() {
    this.props.getRecipes()
      .then(() => {
        const { allRecipes } = this.props;
        this.setState({
          recipes: allRecipes
        });
      });

    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    $('.carousel').carousel();
    setInterval(() => {
      $('.carousel').carousel('next');
    }, 4000);
  }

  /**
   * @description handles link clicks in pagination
   * 
   * @param {object} page
   * 
   * @returns {void} No returned value
   * 
   * @memberof HomePage
   */
  handlePageClick(page) {
    let selected = ++page.selected;
    this.setState({ selected }, () => {
      this.props.getRecipes(this.state.selected);
    });
  }

  /**
   * @description handle searching action
   * 
   * @returns {void} No returned value
   * 
   * @param {object} event event object
   * 
   * @memberof HomePage
   */
  handleSearch() {
    const query = this.state.query
      ? this.state.query
      : event.target.value;
    if (query && query.length > 1) {
      this.props.search(query)
        .then(() => {
          const { searchedRecipes } = this.state;
          this.setState({
            searchedRecipes
          });
        });
    }
  }

  /**
   * @description handles search form submit action
   * 
   * @param {object} event event object
   * 
   * @returns {void} No returned value
   * 
   * @memberof HomePage
   */
  handleSubmit(event) {
    event.preventDefault();
    this.handleSearch();
  }

  /**
   * @description handles form field change
   * 
   * @returns {void} No returned value
   * 
   * @param {object} event event object
   * 
   * @memberof HomePage
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description renders the landing page of the app
   * 
   * @returns {object} jsx object
   * 
   * @memberof HomePage
   */
  render() {
    return (
      <div>
        <Header {...this.props} />
        <HomeBanner />
        <div className="container bottom-margin-50">
          <div className="row">
            <div className="col s12 m12 l12" >
              <Tabs
                recipes={
                  this.state.recipes
                }
                value={this.state.query}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handlePageClick={this.handlePageClick}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allRecipes: state.recipes.allRecipes,
    paginatation: state.recipes.pagination
  };
}

export default connect(mapStateToProps, { search, getRecipes })(HomePage);
