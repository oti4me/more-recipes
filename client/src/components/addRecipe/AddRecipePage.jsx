import React from 'react';
import { connect } from 'react-redux'
import AddRecipeForm from './AddRecipeForm.jsx'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'

class AddRecipePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header { ...this.props } />
        <div className="container">
          <AddRecipeForm { ...this.props } />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps)(AddRecipePage);
