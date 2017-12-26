import React from 'react';

const TopRecipeList = () => {
  return <div className="col s12 m2 l2 top-margin-40">
    <h4 className="" style={{ fontSize: "24px" }}>Top Recipes</h4>
    <div className="row">
      <div className="col s12 m12 l12">
        <div className="card">
          <div className="card-image">
            <img src="./images/5.jpg" />
            {/* <a className="btn-floating halfway-fab waves-effect waves-light red">
                <i className="material-icons color-green">favorite</i>
              </a> */}
          </div>
          <div className="card-content">
            <h5 className="card-p">Beans and bread</h5>
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img src="./images/4.jpg" />
            {/* <a className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons color-green">favorite</i>
                </a> */}
          </div>
          <div className="card-content">
            <p className="card-p">Rice and Garri</p>
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img src="./images/53.jpg" />
            {/* <a className="btn-floating halfway-fab waves-effect waves-light red">
                    <i className="material-icons color-green">favorite</i>
                  </a> */}
          </div>
          <div className="card-content">
            <p className="card-p">Ginger bread and mashmalow</p>
          </div>
        </div>
      </div>
    </div>
    <a className="waves-effect waves-light btn">View All</a>
  </div>

};

export default TopRecipeList;