'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Solicitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      solicitationPersonId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Solicitation_Person',
          key: 'id',
          as: 'solicitationPersonId',
        }
      },
      solicitationUserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'solicitationUserId',
        }
      },
      status: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      creation_date: {
        type: Sequelize.DATEONLY
      },
      closure_date: {
        type: Sequelize.DATEONLY
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Solicitations');
  }
};