"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      refreshToken: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      tokenVerificationEmail: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photoURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      followingCount: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "0",
      },
      followersCount: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "0",
      },
      likesCount: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "0",
      },
      youtube: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tiktok: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verifiedAccount: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
