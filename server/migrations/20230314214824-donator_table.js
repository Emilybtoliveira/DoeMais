'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Donators', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
      },
      blood_type: { 
        type: Sequelize.STRING(60), 
        allowNull: false 
      },
      flag_chat: { 
        type: Sequelize.BOOLEAN
      },
      gender: { 
        type: Sequelize.STRING(20),
        allowNull: false
      },
      aptitude_status: { 
        type: Sequelize.STRING(20),
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Donators');
  }
};