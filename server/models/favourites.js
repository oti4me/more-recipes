'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favourites = sequelize.define('Favourites', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Favourites.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });

        Favourites.belongsTo(models.Recipes, {
          foreignKey: 'recipesId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Favourites;
};