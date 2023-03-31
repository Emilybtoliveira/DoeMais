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
      },
      picture: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER,
      },
      city:{
        type: Sequelize.STRING,
        allowNull: false
      },
      state:{
        type: Sequelize.STRING,
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