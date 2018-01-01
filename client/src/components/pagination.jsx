import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: 0,
      page: 0,
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  handlePagination(e) {
    e.preventDefault()
    let page = e.target.dataset['page'];
    this.setState({
      page: page
    });
  }

  pagination() {
    let links = [];
    for (let i = 1; i <= this.props.pages; i++) {
      links.push(
        <li className="" key={i}>
          <Link to="" data-page={i} onClick={this.handlePagination.bind(this)} className={this.state.page === i ? "color-green" : ''}>{i}</Link>
        </li>
      )
    }
    return (
      links.map(list => {
        return list;
      })
    )
  }

  render() {
    return (
      <div>
        <ul className="pagination" style={{ textAlign: "center" }}>
          <li className="disabled">
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          {this.pagination()}
          <li className="waves-effect disabled">
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
}

export default connect(mapStateToProps)(Pagination);
