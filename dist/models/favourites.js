'use strict';

module.exports = function (sequelize, DataTypes) {
  var Favourites = sequelize.define('Favourites', {
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return Favourites;
};