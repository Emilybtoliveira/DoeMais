'use strict';
const bcrypt = require('bcrypt');
const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // cria o usuario
    const user = await db.User.create({
      name: 'HU',
      email: 'hu@gmail.com',
      password: await bcrypt.hash("123", "$2a$08$bEnwhtx4TktxTs0MU6KuJu"),
      active: true,
    });

    // Cria o admin relacionado ao usuário
    const admin = await db.Admin.create({
      userId: user.id,
    });

    // Retorna o resultado da operação
    return {
      user,
      admin,
    };
  },

  async down (queryInterface, Sequelize) {
    // Remove o admin
    await db.Admin.destroy({
      where: {
        userId: user.id,
      },
    });

    // Remove o usuário
    await db.User.destroy({
      where: {
        id: user.id,
      },
    });
  }
};
