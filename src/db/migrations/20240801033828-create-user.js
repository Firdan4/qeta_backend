"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      typePost: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idSound: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      source: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      thumbnail: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      shared: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.STRING,
        defaultValue: "[]",
      },
      mention: {
        type: Sequelize.STRING,
        defaultValue: "[]",
      },
      isComment: {
        type: Sequelize.STRING,
        defaultValue: "anyone",
      },
      isPublic: {
        type: Sequelize.STRING,
        defaultValue: "anyone",
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      additionalLink: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      geolocation: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "[]",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
