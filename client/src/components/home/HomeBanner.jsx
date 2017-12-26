import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class HomeBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
  }

  render() {
    const style1 = {
      height: "430px",
      width: "100%",
      backgroundColor: "#26a69a",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      position: "relative"
    };

    const style2 = {
      width: "100%",
      height: "430px",
    };

    const style3 = {
      width: "100%",
      height: "100%",
      top: 0,
      textAlign: "center",
      color: "#fff",
      bottom: 0,
      position: "absolute",
      backgroundColor: "rgba(0,0,0, 0.3)"
    };
    const style4 = {
      width: "100%",
      height: "100%",
      top: 0,
      paddingTop: "100px",
      color: "#fff",
      textAlign: "center",
      bottom: 0,
      position: "absolute",
      backgroundColor: "rgba(0,0,0, 0.2)",
      zIndex: 100
    };

    const pTag = {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#fff'
    }

    const h1Tag = {
      fontSize: '38px',
      fontWeight: 'bold',
      color: '#333'
    }

    return (
      <div className="" style={style1}>
        <div style={style3}>
          <div className="carousel carousel-slider center" data-indicators="true">
            <div className="carousel-fixed-item center">
            </div>
            <div className="carousel-item red white-text" style={style2} href="#one!">
              <div style={style3}>
                <img style={style2} src="./images/img.jpg" alt="image" />
              </div>
              <div style={style4}>
                <h2 style={h1Tag}>Welcome to the biggest Recipe sharing app</h2>
                <p className="" style={pTag}>Share your biggest fun</p>
              </div>
            </div>
            <div className="carousel-item red white-text" style={style2} href="#one!">
              <div style={style3}>
                <img style={style2} src="./images/img2.jpg" alt="image" />
              </div>
              <div style={style4}>
                <h2 style={h1Tag}>Share your fantastic recipe idea</h2>
                <p className="" style={pTag}>Sharing your culture with passion</p>
              </div>
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
