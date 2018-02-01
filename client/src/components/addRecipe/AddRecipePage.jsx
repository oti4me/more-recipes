import React from 'react';
import { connect } from 'react-redux'
import AddRecipeForm from './AddRecipeForm'
import Footer from '../Footer'
import Header from '../Header'

/**
 * 
 * @class AddRecipePage
 * 
 * @extends {React.Component}
 */
class AddRecipePage extends React.Component {

  /**
   * @description Creates an instance of AddRecipePage.
   * 
   * @param {object} props 
   * 
   * @memberof AddRecipePage
   */
  constructor(props) {
    super(props);
  }

  /**
   * @description Renders the add recipe apge
   * 
   * @returns {object} returns add recipe page jsx
   * 
   * @memberof AddRecipePage
   */
  render() {
    return (
      <div className="main">
        <Header {...this.props} />
        <div className="container cont">
          <AddRecipeForm {...this.props} />
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
