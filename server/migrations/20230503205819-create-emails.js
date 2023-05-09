'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Email', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      to: {
        type: Sequelize.STRING,
      },
      subject: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      },
      html: {
        type: Sequelize.TEXT,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Email');
  }
};
