import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import axios from 'axios';
import ReviewList from './ReviewsList.jsx';
import { addReview } from '../../actions/addReview';
import { getReviews } from '../../actions/getReviews';

const header = {
  headers: {
    'x-access-token': window.localStorage.userToken,
    authorization: window.localStorage.userToken
  }
}

class ReviewCommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      recviews: []
    }
    this.submitComment = this.submitComment.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      reviews: this.props.reviews
    });
  }

  submitComment(e) {
    e.preventDefault()
    const { id } = this.props.match.params;
    const { comment } = this.state;
    this.setState({
      comment: ''
    });
    if (comment.length === 0) {
      return Materialize.toast('You didn\'t enter any comment', 3000, 'red');
    }
    // call the add comment api
    this.props.addReview({
      id,
      comment
    }, (result) => {
      if (result) {
        this.props.getReviews(id, (res) => {
          if (res) {
            this.setState({
              reviews: this.props.reviews
            });
          }
        })
        Materialize.toast('Your review has been recieved', 3000, 'green');
      } else {
        const { errors } = this.props;
        if (errors) {
          if (errors.status === 400) {
            errors.message.map(err => {
              Materialize.toast(err.msg, 4000, 'red');
            });
          } else if (errors.status === 409) {
            Materialize.toast(errors.message, 4000, 'red');
          } else {
            Materialize.toast(error, 4000);
          }
        }
        else {
          return this.props.history.push('/profile');
        }
      }
    });
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div id="reviewBox" className="modal">
        <div className="modal-content">
          <h5 style={{ textAlign: 'center' }}>Add Comment</h5>
          <p></p>
          <form>
            <textarea rows={9} style={{ height: '150px' }} name="comment" placeholder="Enter your comment" onChange={this.handleChange} value={this.state.comment}>
            </textarea>
          </form>
        </div>
        <div className="modal-footer">
          <a onClick={this.submitComment} className="modal-trigger waves-effect waves-green btn modal-close" href="#reviews">Submit</a>
        </div>
      </div>
    )
  }
}

ReviewCommentBox.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews,
    errors: state.recipes.errors,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps, { addReview, getReviews })(ReviewCommentBox);