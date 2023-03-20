'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Solicitation_People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      bloodtype: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      picture: {
        type: Sequelize.STRING
      },
      city:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      hospital:{
        type: Sequelize.STRING(60)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Solicitation_People');
  }
};