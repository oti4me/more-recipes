import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getRecipes } from '../actions/getAllRecipes';
import getMyRecipes from '../actions/getMyRecipes';
import { getFavourites } from '../actions/favouritesAction';

/**
 * 
 * @class Pagination
 * 
 * @extends {Component}
 */
class Pagination extends Component {

  /**
   * @description Creates an instance of Pagination.
   * 
   * @param {object} props 
   * 
   * @memberof Pagination
   */
  constructor(props) {
    super(props);
    this.state = {
      pagination: {}
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * @description gets pagination value on page load
   * 
   * @param {object} nextProps
   * 
   * @returns {undefined} No return type
   * 
   * @memberof Pagination
   */
  componentDidMount() {
    this.setState({
      pagination: this.props.pagination
    })
  }

  /**
   * @description update state with current pagination value 
   * 
   * @param {object} nextProps
   * 
   * @returns {undefined} No return type
   * 
   * @memberof Pagination
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      pagination: nextProps.pagination
    })
  }

  /**
  * @description handles pagination clicks
  * 
  * @param {object} page holds page number
  * 
  * @returns {undefined} No returned value
  * 
  * @memberof Pagination
  */
  handlePageClick(page) {
    const selected = ++page.selected;
    const {
      clickedFrom,
      getRecipes,
      getFavourites,
      getMyRecipes,
      user: {
        userId
      }
    } = this.props;

    if (clickedFrom === 'home') {
      getRecipes(selected)
    } else if (clickedFrom === 'favourite') {
      getFavourites(userId, selected)
    } else {
      getMyRecipes(userId, selected)
    }
  }

  /**
   * @description renders pagination component
   * 
   * @param {object} props
   * 
   * @returns {object} jsx oject that renders pangination 
   *  
   * @memberof Pagination
   */
  render() {
    return (
      <div className="pagination">
        <ReactPaginate
          previousLabel='previous'
          nextLabel='next'
          breakLabel={<a href="!#">...</a>}
          breakClassName='break-me'
          pageCount={this.state.pagination
            ? this.state.pagination.pageCount
            : 1
          }
          marginPagesDisplayed={5}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName='pagination'
          subContainerClassName='pages pagination'
          activeClassName='active'
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { recipes: { pagination }, auth: { user } } = state
  return {
    pagination,
    user
  }
}

export default connect(mapStateToProps,
  { getRecipes, getMyRecipes, getFavourites }
)(Pagination);
