const UserController = require('./UserController.js');
const SolicitationController = require('./SolicitationController.js');

const Controllers = {};

//adicionar aqui sempre que um novo controller for criado
Controllers.UserController = UserController;
Controllers.SolicitationController = SolicitationController;

module.exports = Controllers;