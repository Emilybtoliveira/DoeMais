const Express = require('express');
const multer = require('multer')
const Controllers = require("../controllers/index.js");

const router = Express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/users') // define o diretório de destino para salvar as imagens
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // define o nome do arquivo
    }
  });

const upload = multer({ storage: storage });

//Rotas de Usuario
router.get('/user',(req, res) => {Controllers.UserController.getAll(req,res);})
router.get('/user/:id',(req, res) => {Controllers.UserController.getUser(req,res);})
router.put('/user',(req, res) => {Controllers.UserController.update(req,res);})
router.delete('/user/:id',(req, res) => {Controllers.UserController.delete(req,res);})
router.post('/login',(req, res) => {Controllers.UserController.login(req,res);})
router.post('/register',(req, res) => {Controllers.UserController.register(req,res);})

router.post('/upload-img/:id', upload.single('image'), (req, res) => {Controllers.UserController.uploadImage(req,res);})

//Rotas de Solicitações
router.get('/solicitations',(req, res) => {Controllers.SolicitationController.getSolicitations(req,res);})
router.get('/solicitations/feed',(req, res) => {Controllers.SolicitationController.getUserFeed(req,res);})
router.post('/solicitations', upload.single('foto_receptor'), (req, res) => {Controllers.SolicitationController.create(req,res);})
router.put('/solicitations',(req, res) => {Controllers.SolicitationController.update(req,res);})
router.put('/solicitations/:id',(req, res) => {Controllers.SolicitationController.disable(req,res);})


module.exports = router;