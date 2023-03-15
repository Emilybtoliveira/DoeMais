const Express = require('express');
const Controllers = require("../controllers/index.js");

const router = Express.Router();

//aqui vao as rotas
router.get('/get-users',(req, res) => {Controllers.UserController.getAll(req,res);})
router.post('/create-user',(req, res) => {Controllers.UserController.create(req,res);})
router.put('/update-user/:id',(req, res) => {Controllers.UserController.update(req,res);})
router.delete('/delete-user/:id',(req, res) => {Controllers.UserController.delete(req,res);})

module.exports = router;