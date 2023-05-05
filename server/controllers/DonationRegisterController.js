const { DonationRegister, User, Donator, Admin } = require('../models');
const qr = require('qrcode')
const bcrypt = require('bcrypt')
const base64url = require('base64url')

const DonationRegisterController = {};

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

DonationRegisterController.create = async function(req, res){
    try {
        const donationRegister = await DonationRegister.create({
            date: req.body.date,
            place: req.body.place,
            validated: false,
            donatorDonationRegisterId: req.body.idDonator
        })

        res.status(200).json(donationRegister); 
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

DonationRegisterController.validate = async function(req, res){
    try {
        const decodedId = base64url.decode(req.params.id)
        const donationRegister = await DonationRegister.findOne({ where: {hashedId: decodedId}})

        if (!donationRegister)
        {
            res.status(400).json({ error: "Essa doacao nao existe" });
            return
        }

        if (donationRegister.validated) {
            res.status(400).json({ error: "Essa doacao já foi validada" });
            return
        }

        if (donationRegister.donatorDonationRegisterId)
        {
            res.status(400).json({ error: "Essa doacao nao foi criada na instituicao" });
            return
        }

        const user = await User.findOne( { where: { email: req.body.email }, 
            attributes: {exclude: ['password']},
            include: [{model: Donator, as: 'donator'}, {model: Admin, as: 'admin'}]})

        if (!user)
        {
            res.status(400).json({ error: "Esse usuário nao está cadastrado no site" });
            return
        }

        if (!user.donator)
        {
            res.status(400).json({ error: "Esse usuário nao é um doador" });
            return
        }

        // TODO: VERIFICAR SE ALGUMA DOACAO BATE COM ESSA

        donationRegister.donatorDonationRegisterId = user.donator.id;
        donationRegister.validated = true;
        donationRegister.validated_at = today;
        await donationRegister.save()
        res.status(200).json({ message: "Doaçao adicionada com sucesso"});
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

DonationRegisterController.createQrCode = async function(req, res){
    try {
        const donationRegister = await DonationRegister.create({
            date: today.toUTCString(),
            place: req.body.place,
        })
        
        const hashedId = await bcrypt.hash(donationRegister.id.toString(), "$2a$08$bEnwhtx4TktxTs0MU6KuJu")
        const encodedId = base64url(hashedId);
        // para nao ter problemas com / e quebrar o link

        donationRegister.hashedId = hashedId
        await donationRegister.save()

        const link = 'http://localhost:3000/validate-donation-register/' + encodedId
        qr.toDataURL(link, (err, src) => {
            if (err) res.status(404).json(err)
            res.status(200).json(src)
        })
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

DonationRegisterController.getAll = async function(req, res){
    try {
        const donationRegister = await DonationRegister.findAll({
            where:{
                donatorDonationRegisterId: req.query.idDonator
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