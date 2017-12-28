import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';


class ReviewsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { reviews } = this.props;
    if (reviews !== undefined && reviews.length > 0) {
      return (
        <ul>
          {reviews.map(review => {
            return (
              <div className="row" key={shortId.generate()}>
                <div className="col s12 m6 l6">
                  <li key={shortId.generate()} className="collection-item avatar" style={{ backgorundColor: '#ccc', borderRadius: '5px' }}>
                    <p style={{ fontWeight: 'bold', color: '#999' }}>{review.User ? review.User.firstname + ' ' + review.User.lastname : ''}, {review.createdAt.split('T')[0]}</p>
                    <span style={{ wordWrap: 'break-word' }} className="title">{review.comment}</span>
                    <hr />
                  </li>
                </div>
                <div className="col s12 m6 l6"></div>
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

ReviewsList.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
}

export default connect(mapStateToProps)(ReviewsList);