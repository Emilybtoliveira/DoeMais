const Express = require('express');
const Controllers = require("../controllers/index.js");

const router = Express.Router();

//aqui vao as rotas
router.get('/users',(req, res) => {Controllers.UserController.getAll(req,res);})
router.post('/users',(req, res) => {Controllers.UserController.create(req,res);})


module.exports = router;