import React from 'react';
import cupcake from '../../../public/images/img.jpg';
import vegetable from '../../../public/images/img2.jpg';

const HomeBanner = (props) => {
  return (
    <div className="bannerWrapper">
      <div className="carouselContainer">
        <div
          className="carousel carousel-slider center"
          data-indicators="true"
        >
          <div className="carousel-fixed-item center" />
          <div className="carousel-item red white-text" href="#one!">
            <div >
              <img className="carouselImage" src={cupcake} alt="" />
            </div>
            <div className="carouselContent">
              <h2 className="carouselHeader">
                THE RECIPE SHARING PLATFORM
              </h2>
              <p className="carouselparagraph">
                Share your biggest fun
              </p>
            </div>
          </div>
          <div className="carousel-item red white-text" href="#one!">
            <div className="carouselContainer">
              <img className="carouselImage" src={vegetable} alt="" />
            </div>
            <div className="carouselContent">
              <h2 className="carouselHeader">
                SHARE YOUR FANTASTIC RECIPE IDEA
              </h2>
              <p className="carouselparagraph">
                Sharing your culture with passion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
