const { User, Donator, Solicitation } = require('../models');

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
            if (password){
                await User.update({ name, email, password, phone }, { where: { id: id } });
            }else{
                await User.update({ name, email, phone }, { where: { id: id } });
            }
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

        if (!user) {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
            })

            const donator = await Donator.create({
                userId: user.id,
                blood_type: req.body.blood_type,
                flag_chat: req.body.flag_chat,
                gender: req.body.gender,
                aptitude_status: "undefined",
            })
            
            res.status(200).json({ user, donator });
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
        if (user) {
            const password_valid = (req.body.password == user.password)
            if (password_valid) {

                delete user.dataValues.password;
                res.status(200).json( {user: user} )

            } else {
                res.status(400).json({ error: "Senha incorreta." })
            }
        } else {
            res.status(400).json({ error: "Não foi encontrado usuário com email correspondente." })
        }

    } catch (error) {
        res.status(404).json({ error: error })
    }
}


module.exports = UserController;