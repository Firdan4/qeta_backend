'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(14)
      },
      idUser: {
        type: Sequelize.CHAR(14)
      },
      typePost: {
        type: Sequelize.STRING
      },
      idSound: {
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      mention: {
        type: Sequelize.STRING
      },
      isComment: {
        type: Sequelize.STRING
      },
      isPublic: {
        type: Sequelize.STRING
      },
      views: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      },
      shared: {
        type: Sequelize.STRING
      },
      additionalLink: {
        type: Sequelize.STRING
      },
      geolocation: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};