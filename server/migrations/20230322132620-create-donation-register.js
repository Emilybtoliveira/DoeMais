'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DonationRegister', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      donatorDonationRegisterId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Donator',
          key: 'id',
          as: 'donatorDonationRegisterId',
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      place: {
        type: Sequelize.STRING,
        allowNull: true
      },
      validated: {
        type: Sequelize.BOOLEAN
      },
      hashedId: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DonationRegister');
  }
};