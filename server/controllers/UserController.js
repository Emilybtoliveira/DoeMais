const { User, Donator, Solicitation } = require('../models');

const UserController = {};


UserController.getAll = async function(req, res){
    try 
    {
        const data = await User.findAll({ include: [{model: Donator, as: 'donator'}, {model: Solicitation, as: 'solicitations'}] }); 

        /* include: [{ model: User, attributes: { exclude: ['password'] },
                        model : Job , as: 'jobs', }], */

        res.status(200).json({ data });        
    } catch (error) 
    {
        res.status(500).json({ message: error });        
    }
}

UserController.update = async function(req, res){
    try {
        const { id, name, email, password, phone, blood_type, flag_chat, gender, aptitude_status } = req.body

        const user = await User.findOne({ where: { id }})

        if (!user) {
            res.status(401).json({ message: "No user found." })
        } else {
            await User.update({ name, email, password, phone }, { where: { id: id } });
            await Donator.update({ blood_type, flag_chat, gender, aptitude_status }, { where: { userId: id } });
            res.status(200).json()
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

UserController.delete = async function(req, res){
    try {
        const { id } = req.params

        const user = await User.findOne({ where: { id: id }})
        
        if (!user) {
            res.status(401).json({ message: "No user found." })
        } else {
            await User.destroy({ where: { id: id } })
            res.status(200).json()
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

UserController.register = async function(req, res){
    try {
        const user = await User.findOne( { where: { email: req.body.email } } )

        if (!user) {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,

                blood_type: req.body.blood_type,
                flag_chat: req.body.flag_chat,
                gender: req.body.gender,
                aptitude_status: "undefined",
            })
            
            res.status(200).json({ user });
        }
        else {
            res.status(400).json({ error: "Email already exists" })
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

UserController.login = async function(req, res){
    try {
        const user = await User.findOne( { where: { email: req.body.email} })
        if (user) {
            const password_valid = (req.body.password == user.password)
            if (password_valid) {
                res.status(200).json( {user: user} )
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