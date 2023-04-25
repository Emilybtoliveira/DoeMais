const UserController = require('./UserController.js');
const SolicitationController = require('./SolicitationController.js');
const DonationRegisterController = require('./DonationRegisterController.js');

const Controllers = {};

//adicionar aqui sempre que um novo controller for criado
Controllers.UserController = UserController;
Controllers.SolicitationController = SolicitationController;
Controllers.DonationRegisterController = DonationRegisterController;


module.exports = Controllers;