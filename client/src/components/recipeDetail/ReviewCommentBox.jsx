import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addReview from '../../actions/addReview';

/**
 * @description create an object of review comment box
 * 
 * @class ReviewCommentBox
 * 
 * @extends {React.Component}
 */
export class ReviewCommentBox extends React.Component {

  /**
   * @description Creates an instance of ReviewCommentBox.
   * 
   * @param {object} props 
   * 
   * @memberof ReviewCommentBox
   */
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    }
    this.submitComment = this.submitComment.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * @description Handle add recipe actions
   * 
   * @param {object} event event object
   * 
   * @returns {undefined} No returned calue
   * 
   * @memberof ReviewCommentBox
   */
  submitComment(event) {
    event.preventDefault()
    const { id } = this.props.match.params;
    const { comment } = this.state;
    this.setState({
      comment: ''
    });
    if (comment.length === 0) {
      return Materialize
        .toast('You didn\'t enter any comment', 3000, 'red');
    }
    this.props.addReview({ id, comment }, Materialize);
  }

  /**
   * @description handles form field change
   * 
   * @param {object} event event object
   * 
   * @returns {undefined} No return value
   * 
   * @memberof ReviewCommentBox
   */
  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description
   * 
   * @returns {object} returns jsx object for review comment box 
   * 
   * @memberof ReviewCommentBox
   */
  render() {
    return (
      <div id="reviewBox" className="modal">
        <form id="form">
          <div className="modal-content">
            {this.props.loggedIn
              ? <h5 style={{ textAlign: 'center' }}>Add Comment</h5>
              : ''
            }
            <p />

            <textarea
              rows={9}
              style={{ height: '150px' }}
              name="comment"
              placeholder="Enter your comment"
              onChange={this.handleChange}
              value={this.state.comment}
            />

          </div>
          <div className="modal-footer">
            <a
              className="modal-trigger waves-effect waves-green btn modal-close"
              id="commentBtn"
              onClick={this.submitComment}
              href="#reviews"
            >
              Submit
            </a>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews,
    errors: state.recipes.errors,
    loggedIn: state.auth.loggedIn
  };
}

export default connect(mapStateToProps, { addReview })(ReviewCommentBox);