'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
      },
      name: { 
        type: Sequelize.STRING(60),
        allowNull: false 
      },
      email: { 
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false
      },
      password: { 
        type: Sequelize.STRING(20), 
        allowNull: false 
      },
      phone: { 
        type: Sequelize.STRING(20) 
      },
      DonatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Donator',
          key: 'id',
          as: 'DonatorId'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};