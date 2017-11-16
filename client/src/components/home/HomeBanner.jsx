import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class HomeBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    $('.carousel.carousel-slider').carousel({fullWidth: true});
  }

  render() {
    const style1 = {
      height: "450px", 
      width: "100%",
      backgroundColor: "#26a69a",
      backgroundImage : "url('./images/23.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      position: "relative"
    };

    const style2 = {
      width:"100%", 
      height: "100%"
    };
    
    const style3 = {
      width:"100%",
      height: "100%", 
      top: 0, 
      textAlign: "center", 
      color: "#ccc", 
      bottom: 0, 
      position: "absolute", 
      backgroundColor: "rgba(0,0,0, 0.5)"
    };

  return (
    <div className="" style={style1}>
      <div style={style3}>
        <div className="carousel carousel-slider center" data-indicators="true">
          <div className="carousel-fixed-item center">
          </div>
          <div className="carousel-item red white-text" style={style1} href="#one!">
            <h2>Welcome the biggest Recipe sharing app</h2>
            <p className="white-text">This is your first panel</p>
          </div>
          <div className="carousel-item amber white-text" href="#two!">
            <h2>Second Panel</h2>
            <p className="white-text">This is your second panel</p>
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
