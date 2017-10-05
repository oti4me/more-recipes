'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reviews = sequelize.define('Reviews', {
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    comment: DataTypes.TEXT,    
  });

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
    });
    Reviews.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Reviews;
};