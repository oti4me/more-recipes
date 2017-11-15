import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class HomeBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const style1 = {
      height: "450px", 
      width: "100%",
      backgroundColor: "#26a69a",
      position: "relative"
    };

    const style2 = {
      width:"100%", 
      height: "100%"
    };
    
    const style3 = {
      width:"100%",
      height: "450px", 
      top: 0, 
      textAlign: "center", 
      color: "#ccc", 
      bottom: 0, 
      position: "absolute", 
      backgroundColor: "rgba(0,0,0, 0.6)"
    };

  return (
    <div className="top-margin-40" style={style1}>
      <img style={style2} src="./images/4.jpg"/>
      <div style={style3}>
        <h1 className="margin-top:40">More Recipes</h1>
        <p>The fantastic recipe sharing application</p>
        <div className="carousel carousel-slider center" data-indicators="true">
          <div className="carousel-fixed-item center">
            {/* <a className="btn waves-effect white grey-text darken-text-2">button</a> */}
          </div>
          <div className="carousel-item red white-text" href="#one!">
            <h2>Welcome the biggest Recipe sharing app</h2>
            <p className="white-text">This is your first panel</p>
          </div>
          <div className="carousel-item amber white-text" href="#two!">
            <h2>Second Panel</h2>
            <p className="white-text">This is your second panel</p>
          </div>
          <div className="carousel-item green white-text" href="#three!">
            <h2>Third Panel</h2>
            <p className="white-text">This is your third panel</p>
          </div>
          <div className="carousel-item blue white-text" href="#four!">
            <h2>Fourth Panel</h2>
            <p className="white-text">This is your fourth panel</p>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps)(HomeBanner);
