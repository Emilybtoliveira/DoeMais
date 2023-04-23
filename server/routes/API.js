const Express = require('express');
const Controllers = require("../controllers/index.js");

const router = Express.Router();

//Rotas de Usuario
router.get('/user',(req, res) => {Controllers.UserController.getAll(req,res);})
router.get('/user/:id',(req, res) => {Controllers.UserController.getUser(req,res);})
router.put('/user',(req, res) => {Controllers.UserController.update(req,res);})
router.delete('/user/:id',(req, res) => {Controllers.UserController.delete(req,res);})
router.post('/login',(req, res) => {Controllers.UserController.login(req,res);})
router.post('/register',(req, res) => {Controllers.UserController.register(req,res);})

router.post('/confirm-email', (req, res) => {Controllers.UserController.confirmEmail(req, res);})
router.post('/forgot-password', (req, res) => {Controllers.UserController.forgotPassword(req, res);})
router.post('/recover-password', (req, res) => {Controllers.UserController.recoverPassword(req, res);})

//Rotas de Solicitações
router.get('/solicitations',(req, res) => {Controllers.SolicitationController.getSolicitations(req,res);})
router.get('/solicitations/feed',(req, res) => {Controllers.SolicitationController.getUserFeed(req,res);})
router.post('/solicitations',(req, res) => {Controllers.SolicitationController.create(req,res);})
router.put('/solicitations',(req, res) => {Controllers.SolicitationController.update(req,res);})
router.put('/solicitations/:id',(req, res) => {Controllers.SolicitationController.disable(req,res);})


module.exports = router;