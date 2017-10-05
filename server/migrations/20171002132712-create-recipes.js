'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      downvotes: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      upvotes: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      ingredients: Sequelize.STRING,
      direction: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};