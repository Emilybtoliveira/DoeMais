const Express = require('express');
const Controllers = require("../controllers/index.js");

const router = Express.Router();

//aqui vao as rotas
router.get('/users',(req, res) => {Controllers.UserController.getAll(req,res);})
router.post('/users',(req, res) => {Controllers.UserController.create(req,res);})
router.get('/solicitations',(req, res) => {Controllers.SolicitationController.getSolicitations(req,res);})
router.post('/solicitations',(req, res) => {Controllers.SolicitationController.create(req,res);})
router.put('/solicitations',(req, res) => {Controllers.SolicitationController.update(req,res);})
router.put('/solicitations/:id',(req, res) => {Controllers.SolicitationController.disable(req,res);})
router.get('/solicitations/feed',(req, res) => {Controllers.SolicitationController.getUserFeed(req,res);})


module.exports = router;