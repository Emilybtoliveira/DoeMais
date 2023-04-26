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

const storage_solicitation = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/solicitations') // define o diretório de destino para salvar as imagens
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // define o nome do arquivo
  }
});

const uploadUser = multer({ storage: storage });
const uploadSolicitation = multer({ storage: storage_solicitation });

//Rotas de Usuario
router.get('/user',(req, res) => {Controllers.UserController.getAll(req,res);})
router.get('/user/:id',(req, res) => {Controllers.UserController.getUser(req,res);})
router.put('/user',(req, res) => {Controllers.UserController.update(req,res);})
router.delete('/user/:id',(req, res) => {Controllers.UserController.delete(req,res);})
router.post('/login',(req, res) => {Controllers.UserController.login(req,res);})
router.post('/register',(req, res) => {Controllers.UserController.register(req,res);})

router.post('/upload-img/:id', uploadUser.single('image'), (req, res) => {Controllers.UserController.uploadImage(req,res);})

//Rotas de Solicitações
router.get('/solicitations',(req, res) => {Controllers.SolicitationController.getSolicitations(req,res);})
router.get('/solicitations/feed',(req, res) => {Controllers.SolicitationController.getUserFeed(req,res);})
router.post('/solicitations', uploadSolicitation.single('picture'), (req, res) => {Controllers.SolicitationController.create(req,res);})
router.put('/solicitations',(req, res) => {Controllers.SolicitationController.update(req,res);})
router.put('/solicitations/:id',(req, res) => {Controllers.SolicitationController.disable(req,res);})

//Rotas de Registro de Doacoes
router.get('/donation-register',(req, res) => {Controllers.DonationRegisterController.getAll(req,res);})
router.post('/donation-register',(req, res) => {Controllers.DonationRegisterController.create(req,res);})
router.put('/donation-register', (req, res) => {Controllers.DonationRegisterController.update(req,res);})
router.delete('/donation-register/:id', (req, res) => {Controllers.DonationRegisterController.delete(req,res);})

module.exports = router;