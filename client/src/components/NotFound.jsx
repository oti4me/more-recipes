import React from 'react';
import Header from './Header'
import Footer from './Footer'

/**
 * @description Renders the not found page
 * 
 * @param {object} props
 * 
 * @returns {object} jsx object that renders the not found page 
 */
export const NotFound = (props) => (
  <div className="notFoundDiv main">
    <Header />
    <div className="cont">
      <h1 className="notFoundText" style={{ textAlign: "center", paddingTop: "50px" }}>Not found</h1>
    </div>
    <Footer />
  </div>
)

export default NotFound;