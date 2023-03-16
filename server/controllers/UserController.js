const { User } = require('../models')


const UserController = {};  


UserController.getAll = async function(req, res){
    try 
    {
        const data = await User.findAll();
        
        res.status(200).json({ message: "Here is your data.", data: data });        
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


module.exports = UserController;