'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      _id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      conversationId:{
        type:Sequelize.UUID,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senderId: {
        type: Sequelize.CHAR(14),
        allowNull: false,
      },
      receiverId: {
        type: Sequelize.CHAR(14),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      video: {
        type: Sequelize.STRING,
        allowNull: true
      },
      audio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      system: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      received: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      pending: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      quickReplies: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Stores quick reply options in JSON format'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};