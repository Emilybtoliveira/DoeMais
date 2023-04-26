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
                userDonationRegisterId: req.body.idUser
            }
        })

        res.status(200).json(donationRegister)
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

DonationRegisterController.delete = async function(req, res){
    try {
        const { id } = req.params
        const donationRegister = await DonationRegister.findOne({ where:{ id: id }})
        if (!donationRegister)
        {
            res.status(400).json({ message: "Doaçao nao encontrada" });
            return
        }

        await DonationRegister.destroy({ where: { id: id } })
        res.status(200).json({ message: "Deletado com sucesso" })
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

DonationRegisterController.update = async function(req, res){
    try {
        const donationRegister = await DonationRegister.findOne({ where:{ id: req.body.id }})

        if (!donationRegister)
        {
            res.status(400).json({ message: "Doaçao nao encontrada" });
            return
        }

        donationRegister.place = req.body.place;
        donationRegister.date = req.body.date;

        await donationRegister.save()

        res.status(200).json(donationRegister)
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

module.exports = DonationRegisterController;