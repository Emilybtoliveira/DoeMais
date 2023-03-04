import Express from "express";

const router = Express.Router();

router.get('/object', (req, res) => {
    res.json({ title: 'Deu certo!', subtitle:'esse é um teste usando objetos vindos da API' })
})

router.get('/', (req, res) => {
    res.json('Servidor respondendo!')
})


export default router;