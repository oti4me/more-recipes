'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipes = sequelize.define('Recipes', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: DataTypes.STRING,
    direction: DataTypes.STRING,
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    }
  });
  Recipes.associate = (models) => {
    Recipes.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Recipes.hasMany(models.Reviews, {
      foreignKey: 'recipeId'
    });

    Recipes.hasMany(models.Votes, {
      foreignKey: 'recipeId'
    });

    Recipes.hasMany(models.Favourites, {
      foreignKey: 'recipeId'
    });
  }
  return Recipes;
};