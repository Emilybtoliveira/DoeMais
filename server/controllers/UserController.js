const { User, Donator, Solicitation } = require('../models');
const randomstring = require('randomstring')
const nodemailer = require('nodemailer');
const { DATEONLY } = require('sequelize');

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
    },
});

const UserController = {};


UserController.getAll = async function(req, res){
    try 
    {
        const data = await User.findAll({ include: [{model: Donator, as: 'donator'}, {model: Solicitation, as: 'solicitations'}] }); 

        res.status(200).json({ data });                
    } catch (error) 
    {
        res.status(500).json({ error: error });        
    }
}

UserController.getUser = async function(req, res){
    try {
        const data = await User.findOne({where: { id: req.params.id }, attributes: { exclude: ['password'] }, include: [{model: Donator, as: 'donator'}] }); 
        if (!data){
            res.status(404).json({ error: "Nenhum usuário encontrado para o id fornecido." });   
        }
        else {
            res.status(200).json({ data });       
        }
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

UserController.update = async function(req, res){
    try {
        const { id, name, email, password, phone, blood_type, flag_chat, gender, aptitude_status } = req.body

        const user = await User.findOne({ where: { id }})

        if (!user) {
            res.status(404).json({ error: "Nenhum usuário encontrado para o id fornecido." })
        } else {
            await User.update({ name, email, password, phone }, { where: { id: id } });
            await Donator.update({ blood_type, flag_chat, gender, aptitude_status }, { where: { userId: id } });
            res.status(200).json()
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

UserController.delete = async function(req, res){
    try {
        const { id } = req.params

        const user = await User.findOne({ where: { id: id }})
        
        if (!user) {
            res.status(404).json({ error: "Nenhum usuário encontrado para o id fornecido." })
        } else {
            await User.destroy({ where: { id: id } })
            res.status(200).json()
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

UserController.register = async function(req, res){
    try {
        const user = await User.findOne( { where: { email: req.body.email },  attributes: {exclude: ['password']} })

        const date = new Date()
        date.setDate(today.getDate() + 3)

        if (!user) {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                active: false,
                confirmationCodeExpiration: date,
                confirmationCode: randomstring.generate(6)
            })

            await Donator.create({
                userId: user.id,
                blood_type: req.body.blood_type,
                flag_chat: req.body.flag_chat,
                gender: req.body.gender,
                aptitude_status: "undefined",
            })

            // configurar email
            const mailOptions = {
                from: 'doemais@gmail.com',
                to: req.body.email,
                subject: 'Confirmação de e-mail',
                text: 'Olá, obrigado por se cadastrar em nosso site. Por favor, clique no link abaixo para confirmar seu endereço de e-mail:',
                html: '<p>Olá,</p><p>Obrigado por se cadastrar em nosso site. Por favor, clique no link abaixo para confirmar seu endereço de e-mail:</p><a href="http://localhost:3000/confirm-email?email=' + req.body.email + '&codigo=' + user.confirmationCode + '">Clique aqui para confirmar</a>'
            };

            //enviar email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send('Erro ao enviar o e-mail');
                } else {
                    res.status(200).json({ message: 'E-mail enviado' });
                }
            });
        }
        else {
            res.status(400).json({ error: "Já existe uma usuário com o email escolhido." })
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

UserController.login = async function(req, res){
    try {
        const user = await User.findOne({ where: { email: req.body.email}, include: [{model: Donator, as: 'donator'}] })
        if (!user)
        {
            res.status(400).json({ error: "Não foi encontrado usuário com email correspondente." })
            return
        }

        if (!user.active)
        {
            res.status(400).json({ error: "É necessário confirmar o email antes de prosseguir" })
            return
        }

        const password_valid = (req.body.password == user.password)
        if (!password_valid)
        {
            res.status(400).json({ error: "Senha incorreta." })
            return
        }

        delete user.dataValues.password;
        res.status(200).json( {user: user} )

    } catch (error) {
        res.status(404).json({ error: error })
    }
}

UserController.confirmEmail = async function(req, res){
    try {
        const email = req.query.email;
        const codigo = req.query.codigo;

        console.log(`Endereço de e-mail: ${email}`);
        console.log(`Código de confirmação: ${codigo}`);

        const user = await User.findOne( { where: { email: email } } )

        if (!user)
        {
            res.status(400).json({ error: "Usuário não existente" })
            return;
        }

        if (user.active)
        {
            res.status(400).json({ error: "Usuário já está ativo" })
            return;
        }

        if (!user.confirmationCode || !user.confirmationCodeExpiration)
        {
            res.status(400).json({ error: "Problemas na hora de confirmar o email" })
            return;
        }

        const date = new Date(user.confirmationCodeExpiration);

        console.log(today)
        console.log(date)

        if (today > date)
        {
            res.status(400).json({ error: "Excedido o tempo limite para confirmar o email" })
            return;
        }

        if (codigo != user.confirmationCode)
        {
            res.status(400).json({ error: "O código está errado" })
            return;
        }

        user.active = true
        user.confirmationCode = null
        user.confirmationCodeExpiration = null

        await user.save()
        res.status(200).json({ message: "Conta confirmada com sucesso" })
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

module.exports = UserController;