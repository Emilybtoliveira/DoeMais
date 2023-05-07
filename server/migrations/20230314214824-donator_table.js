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
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'userId'
        }
      },
      campaignId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Campaign',
          key: 'id',
          as: 'campaignId'
        }
      },
      blood_type: { 
        type: Sequelize.STRING(12), 
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