"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      refreshToken: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tokenVerificationEmail: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photoURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      followingCount: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0",
      },
      followersCount: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0",
      },
      likesCount: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0",
      },
      youtube: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      instagram: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tiktok: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verifiedAccount: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
    await queryInterface.dropTable("Users");
  },
};
