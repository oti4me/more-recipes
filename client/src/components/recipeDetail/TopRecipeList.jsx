import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class TopRecipeList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col s12 m2 l2 top-margin">
        <h6 style={{ fontWeight: 'bold', color: '#999', fontSize: '18px' }}>Your may also like</h6>
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card">
              <div className="card-image">
                <img src="/images/5.jpg" />
              </div>
              <div className="card-content">
                <h5 className="card-p">Top of the list of greate meals</h5>
              </div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="/images/4.jpg" />
              </div>
              <div className="card-content">
                <h5 className="card-p">This is a new meal</h5>
              </div>
            </div>
            <a className="waves-effect waves-light btn">View More</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(TopRecipeList);
