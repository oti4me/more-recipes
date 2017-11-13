'use strict';
module.exports = (sequelize, DataTypes) => {
  var Votes = sequelize.define('Votes', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    voteType: {
      type: DataTypes.STRING,
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
        Recipes.belongsTo(models.Users, {
          foreignKey: 'userId',
        });

        Recipes.belongsTo(models.Recipes, {
          foreignKey: 'recipeId',
        });
      }
    }
  });
  return Votes;
};