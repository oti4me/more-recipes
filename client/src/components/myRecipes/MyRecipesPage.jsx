import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import MyRecipesList from './MyRecipesList.jsx'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'

class MyRecipesPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Header { ...this.props } />
        <div className="container">
          <MyRecipesList />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps)(MyRecipesPage);
