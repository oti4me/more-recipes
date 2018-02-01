'use strict';
module.exports = (sequelize, DataTypes) => {
  let Recipes = sequelize.define('Recipes', {
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
    favouriteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    imageUrl: DataTypes.STRING,
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
      foreignKey: 'recipeId', onDelete: 'cascade', foreignKeyConstraint: true
    });

    Recipes.hasMany(models.Votes, {
      foreignKey: 'recipeId', onDelete: 'cascade', foreignKeyConstraint: true
    });

    Recipes.hasMany(models.Favourites, {
      foreignKey: 'recipeId', onDelete: 'cascade', foreignKeyConstraint: true
    });
  }
  return Recipes;
};