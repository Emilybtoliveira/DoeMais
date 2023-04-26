const { userIcon } = require('@progress/kendo-svg-icons');
const { DonationRegister } = require('../models');

const DonationRegisterController = {};

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

DonationRegisterController.create = async function(req, res){
    try {
        
        const donationRegister = await DonationRegister.create({
            date: req.body.date,
            place: req.body.place,
            userDonationRegisterId: req.body.idUser
            
        })

        res.status(200).json(donationRegister); 
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

DonationRegisterController.getAll = async function(req, res){
    try {
        const donationRegister = await DonationRegister.findAll({
            where:{
                userDonationRegisterId: req.query.idUser
            }
        })

        res.status(200).json(donationRegister)
    } catch (error) {
        res.status(404).json({ message: error });
    }
}



module.exports = DonationRegisterController;