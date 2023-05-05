'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Campaigns', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
      },
      adminCampaignId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Admin',
          key: 'id',
          as: 'adminCampaignId'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      endDate: {
        type: Sequelize.DATEONLY
      },
      number_winners: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      is_open: {
        type: Sequelize.BOOLEAN
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Campaigns');
  }
};
