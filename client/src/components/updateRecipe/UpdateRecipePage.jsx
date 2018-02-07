import React, { Component } from 'react';
import { connect } from 'react-redux'
import UpdateRecipeForm from './UpdateRecipeForm'
import Footer from '../Footer'
import Header from '../Header'

/**
 * 
 * 
 * @class UpdateRecipePage
 * @extends {React.Component}
 */
class UpdateRecipePage extends Component {

  /**
   * Creates an instance of UpdateRecipePage.
   * @param {undefined} props 
   * @memberof UpdateRecipePage
   */
  constructor(props) {
    super(props);
  }

  /**
   * 
   * 
   * @returns {JSX} JSX
   * @memberof UpdateRecipePage
   */
  render() {
    return (
      <div className="main">
        <Header {...this.props} />
        <div className="container cont">
          <UpdateRecipeForm  {...this.props} />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps)(UpdateRecipePage);
