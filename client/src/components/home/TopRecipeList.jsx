import React from 'react';

const TopRecipeList = () => {
  return <div className="col s12 m2 l2 top-margin-40">
    <h4 className="" style={{fontSize: "24px"}}>Top Recipes</h4>

    <div className="row">
      <div className="col s12 m12 l12">
        <div className="card">
          <div className="card-image">
            <img src="./images/5.jpg" />
              <a className="btn-floating halfway-fab waves-effect waves-light red">
                <i className="material-icons color-green">favorite</i>
              </a>
            </div>
            <div className="card-content">
              <p className="card-p">Title</p>
            </div>
          </div>
          <div className="card">
            <div className="card-image">
              <img src="./images/4.jpg" />
                <a className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons color-green">favorite</i>
                </a>
              </div>
              <div className="card-content">
                <p className="card-p">Titlet</p>
              </div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="./images/53.jpg" />
                  <a className="btn-floating halfway-fab waves-effect waves-light red">
                    <i className="material-icons color-green">favorite</i>
                  </a>
                </div>
                <div className="card-content">
                  <p className="card-p">Title</p>
                </div>
              </div>
            </div>
          </div>
          <a className="waves-effect waves-light btn">View All</a>
        </div>

};

export default TopRecipeList;