import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import ReviewList from './ReviewsList.jsx';
import { getReviews } from '../../actions/getReviews';

class ReviewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    },
      this.updated = null
  }

  componentDidMount() {
    this.props.getReviews(this.props.id, (status) => {
      this.setState({
        reviews: this.props.reviews
      });
    });
    $('.modal').modal();
  }

  componentDidUpdate() {
    if (this.props.reviews > this.state.reviews) {
      this.setState({
        reviews: this.props.reviews
      });
    }
  }

  render() {
    return (
      <div id="reviews" className="modal bottom-sheet">
        <div className="modal-content" style={{}}>
          <div style={{ position: 'fixed', left: '0', right: '0', backgroundColor: '#fff', marginTop: '-30px', padding: '20px' }}>
            <h5 style={{ float: 'left' }}>Users Review</h5>
            <a href="#reviewBox" className="waves-effect waves-light btn modal-trigger" style={{ float: 'right' }}>Add Review</a>
          </div>
          <div style={{ clear: 'both', height: '50px' }}></div>
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    )
  }
}

ReviewModal.propTypes = {
  loggedIn: PropTypes.bool,
  reviews: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    state: state,
    reviews: state.recipes.reviews,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps, { getReviews })(ReviewModal);