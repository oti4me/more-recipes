'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favourites = sequelize.define('Favourites', {
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Favourites;
};