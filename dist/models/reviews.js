'use strict';

module.exports = function (sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    comment: DataTypes.TEXT
  });

  Reviews.associate = function (models) {
    Reviews.belongsTo(models.Recipes, {
      foreignKey: 'recipeId'
    });
    Reviews.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return Reviews;
};