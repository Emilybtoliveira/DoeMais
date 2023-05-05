const { Campaign, Donator, DonationRegister } = require('../models');

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const CampaignController = {};

CampaignController.create = async function(req, res){
    try {
        await Campaign.create({
            name: req.body.name,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            adminCampaignId: req.body.idAdmin,
            number_winners: req.body.numberWinners,
            description: req.body.description,
            reward: req.body.premio,
            is_open: true
        })
        res.status(200).json({ message: "Campanha criada com sucesso" })
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

CampaignController.getCampaigns = async function(req, res){
    try {
        if(req.query.adminId){ //retorna as campanhas do usuario
            const data = await Campaign.findAll({
                where:{
                    adminCampaignId: req.query.adminId,
                    is_open: true
                }
            });
            res.status(200).json({ data });
        } else { //retorno todas as campanhas
            const data = await Campaign.findAll();
            res.status(200).json({ data });
        }
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

CampaignController.getAllDonatorsOfCampaign = async function(req, res){
    try {
        const donators = await Donator.findAll({ where: {campaignId: req.query.campaignId}})
        res.status(200).json({ donators })
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

CampaignController.join = async function(req, res){
    try {
        const donator = await Donator.findOne({ where: {id: req.body.donatorId}})
        if (!donator) {
            res.status(400).json({ error: "Nenhum doador encontrado com o id." })
            return
        }

        if (donator.campaignId) {
            if (donator.campaignId == req.body.campaignId)
            {
                res.status(400).json({ error: "Voce já está nessa campanha" })
                return
            }
            res.status(400).json({ error: "Voce já está em outra campanha" })
            return
        }

        const donation = await DonationRegister.findOne({ where: {donatorDonationRegisterId: donator.id, validated: true} })
        if (!donation) {
            res.status(400).json({ error: "Voce nao possui uma doacao validada neste tempo da campanha" })
            return
        }

        const campaign = await Campaign.findOne({ where: {id: req.body.campaignId}})

        if (donation.validated_at < campaign.start_date) {
            res.status(400).json({ error: "Voce nao possui uma doacao validada neste tempo da campanha" })
            return
        }

        // TODO: novo campo, ganhadores
        donator.campaignId = req.body.campaignId
        await donator.save()
        res.status(200).json({ message: "Voce se juntou à campanha" });
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

module.exports = CampaignController;