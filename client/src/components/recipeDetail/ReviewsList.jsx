import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import shortId from 'shortid';
import moment from 'moment';

/**
 * 
 * 
 * @class ReviewsList
 * @extends {React.Component}
 */
class ReviewsList extends React.Component {

  /**
   * @description Creates an instance of ReviewsList.
   * 
   * @param {object} props 
   * 
   * @memberof ReviewsList
   */
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }

  /**
   * @description
   * 
   * @returns {undefined}
   * 
   * @memberof ReviewsList
   */
  componentWillMount() {
    this.setState({
      reviews: this.props.reviews
    });
  }

  /**
   * @description
   * 
   * @param {object} nextProps 
   * 
   * @returns {undefined}
   * 
   * @memberof ReviewsList
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      reviews: nextProps.reviews
    });
  }

  /**
   * @description
   * 
   * @returns {object} jsx object to render review list
   * 
   * @memberof ReviewsList
   */
  render() {
    const reviews = this.state.reviews || [];
    if (reviews !== undefined && reviews.length > 0) {
      return (
        <ul>
          {reviews.map(review => {
            return (
              <div className="row" key={shortId.generate()}>
                <div className="col s12 m6 l6">
                  <li
                    key={shortId.generate()}
                    className="collection-item avatar"
                    style={{ backgorundColor: '#ccc', borderRadius: '5px' }}
                  >
                    <p style={{ color: '#999' }}>
                      <span style={{ fontWeight: 'bold' }}>
                        {review.User
                          ? review.User.firstName + ' ' + review.User.lastName
                          : ''
                        }
                      </span>
                      {' '}
                      <span
                        style={{ float: 'right' }}
                      >
                        {moment(review.createdAt).fromNow()}
                      </span>
                    </p>
                    <span
                      style={{ wordWrap: 'break-word' }}
                      className="title"
                    >
                      {review.comment}
                    </span>
                    <hr />
                  </li>
                </div>
                <div className="col s12 m6 l6" />
              </div>
            )
          })}
        </ul>
      )
    } else {
      return (
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
          <h6 style={{ color: '#888' }}>No reviews found for this recipe (:</h6>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    reviews: state.recipes.reviews
  };
}

export default connect(mapStateToProps)(ReviewsList);