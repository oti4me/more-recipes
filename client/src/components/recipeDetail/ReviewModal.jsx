import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReviewList from './ReviewsList';
import { getReviews } from '../../actions/getReviews';

/**
 * @description
 * 
 * @class ReviewModal
 * 
 * @extends {React.Component}
 */
class ReviewModal extends Component {

  /**
   * @description Creates an instance of ReviewModal.
   * 
   * @param {object} props 
   * 
   * @memberof ReviewModal
   */
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    },
      this.updated = null
  }

  /**
   * @description
   * 
   * @return {undefined}
   * 
   * @memberof ReviewModal
   */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
   * @description
   * 
   * @returns {object} returns jsx object for review modal
   * 
   * @memberof ReviewModal
   */
  render() {
    return (
      <div id="reviews" className="modal bottom-sheet">
        <div className="modal-content" style={{}}>
          <div style={{
            position: 'fixed',
            left: '0',
            right: '0',
            backgroundColor: '#fff',
            marginTop: '-30px',
            padding: '20px'
          }}
          >
            <h5 style={{ float: 'left' }}>Users Review</h5>
            <a
              href="#reviewBox"
              className="waves-effect waves-light btn modal-trigger"
              style={{ float: 'right' }}
            >
              Add Review
            </a>
          </div>
          <div style={{ clear: 'both', height: '50px' }} />
          <ReviewList />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    reviews: state.recipes.reviews,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps, { getReviews })(ReviewModal);