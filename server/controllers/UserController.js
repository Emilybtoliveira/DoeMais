const { User } = require('../models')
const bcrypt = require('bcrypt')

const UserController = {};  


UserController.getAll = async function(req, res){
    try 
    {
        const data = await User.findAll();
        res.status(200).json({ message: "Connection successful", data: data });        
    } catch (error) 
    {
        res.status(404).json({ message: "something went wrong" });        
    }
}

UserController.create = async function(req, res){
    try 
    {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
        })
        .then(() => {
            res.status(200).json({message: "user successfully created"});
        });       
    } catch (error) 
    {
        res.status(404).json({ message: error });
    }
}

UserController.update = async function(req, res){
    try {
        const { id } = req.params
        const { name, email, password, phone } = req.body

        const user = await User.findOne({ where: { id }})

        if (!user) {
            res.status(401).json({ message: "Nenhum usuario encontrado" })
        } else {
            await User.update({ name, email, password, phone }, { where: { id } })
            res.status(200).json({ ok: true })
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

UserController.delete = async function(req, res){
    try {
        const { id } = req.params

        const user = await User.findOne({ where: { id }})
        if (!user) {
            res.status(401).json({ message: "Nenhum usuario encontrado" })
        } else {
            await User.destroy({ where: { id } })
            res.status(200).json({ ok: true })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

UserController.register = async function(req, res){
    try {
        const salt = await bcrypt.genSalt(10)
        pwd = await bcrypt.hash(req.body.password, salt)

        var user = {
            name: req.body.name,
            email: req.body.email,
            password: pwd,
            phone: req.body.phone
        }
        
        created_user = await User.create(user)
        res.status(201).json({message: "user successfully created"});
    } catch (error) {
        res.status(404).json({ message: error })
    }

}

UserController.login = async function(req, res){
    try {
        const user = await User.findOne( { where: { email: req.body.email} })
        if (user) {
            const password_valid = await bcrypt.compare(req.body.password, user.password)
            if (password_valid) {
                res.status(200).json({message: "user successfully created"}, user)
            } else {
                res.status(400).json({ error: "Password Incorrect" })
            }
        } else {
            res.status(400).json({ error: "User does not exist" })
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

module.exports = UserController;