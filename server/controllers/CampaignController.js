const { Campaign, Donator, User, DonationRegister, CampaignWinner } = require('../models');
const raffleCampaign = require('../raffleCampaign')

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const CampaignController = {};

CampaignController.create = async function(req, res){
    try {
        await Campaign.create({
            name: req.body.name,
            donation_place: req.body.donation_place,
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
        const donators = await Donator.findAll({ 
            where: {campaignId: req.query.campaignId},
            include: [
                { model: User }
            ]
        });

        const updatedDonators = await Promise.all(donators.map(async (donator) => {
            const donations = await DonationRegister.findAll({
                where: {donatorDonationRegisterId: donator.id, validated: true},
                order: [['validated_at', 'ASC']]
            })

            const updatedDonator = {
                ...donator.toJSON(),
                donation: donations[0] ? donations[0].validated_at : null
            };
        
            return updatedDonator;
        }));

        console.log("DONATORS")
        console.log(updatedDonators)

        //const users = updatedDonators.map(updatedDonator => updatedDonator.User);
        const users = updatedDonators.map(updatedDonator => {
            const user = updatedDonator.User;
            const donation = updatedDonator.donation;
            user.donation = donation;
            return user;
        });

        console.log(users)
        res.status(200).json({ users });
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
                res.status(400).json({ error: "Você já está nessa campanha" })
                return
            }
            res.status(400).json({ error: "Você já está em outra campanha" })
            return
        }

        const donations = await DonationRegister.findAll({
            where: {donatorDonationRegisterId: donator.id, validated: true},
            order: [['validated_at', 'ASC']]
        })

        if (donations.length == 0) {
            res.status(400).json({ error: "Você não possui uma doação validada neste tempo da campanha" })
            return
        }

        const campaign = await Campaign.findOne({ where: {id: req.body.campaignId}})

        if (!campaign.is_open) {
            res.status(400).json({ error: "Essa campanha não está aberta" })
            return
        }

        if (donations[0].validated_at < campaign.start_date) {
            res.status(400).json({ error: "Você não possui uma doação validada neste tempo da campanha" })
            return
        }

        if (donations[0].place != campaign.donation_place) {
            res.status(400).json({ error: "Sua doação não foi para a mesma da campanha" })
            return
        }

        // TODO: rifflecampaign dps que testar tudo no return quando é zero colocar pra fechar a campanha

        // TODO: enviar email para doemais sobre os ganhadores

        donator.campaignId = req.body.campaignId
        await donator.save()
        res.status(200).json({ message: "Você se juntou à campanha" });
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

CampaignController.endCampaign = async function(req, res){
    try {
        const campaign = await Campaign.findByPk(req.query.campaignId)
        if (!campaign) {
            res.status(400).json("Essa campanha não existe");
            return;
        }

        await raffleCampaign(campaign)

        res.status(200).json({ message: "Campanha encerrada com sucesso" });
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

CampaignController.getAllWinnersOfCampaign = async function(req, res){
    try {
        const winners = await CampaignWinner.findAll({where: {campaignId: req.query.campaignId}})

        const users = [];

        for (const winner of winners) {
            const donator = await Donator.findByPk(winner.donatorId);
            const user = await User.findByPk(donator.userId)
            users.push(user);
        }

        res.status(200).json({ winners: users });
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

module.exports = CampaignController;