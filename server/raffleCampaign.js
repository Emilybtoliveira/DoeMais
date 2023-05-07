const { Random } = require('random-js')
const db = require('./models')
const moment = require('moment')

const random = new Random()
const today = moment().format("YYYY-MM-DD");


const raffleCampaign = async function (campaign) {
    if (campaign.end_date >= today) {
        const donators = await db.Donator.findAll({where: {campaignId: campaign.id}})

        const numDonators = donators.length;
        if (numDonators == 0)
        {
            return;
        }
        const numWinners = campaign.number_winners > numDonators ? numDonators : campaign.number_winners;
    
        // Sortear aleatoriamente os vencedores sem repetição
        const indices = Array.from({ length: numDonators }, (_, i) => i); // criar array de índices dos doadores
        const winnersIndices = random.sample(indices, Math.min(numWinners, numDonators), false); // sortear índices aleatórios sem repetição
        const winners = winnersIndices.map(i => donators[i]); // selecionar os doadores correspondentes aos índices sorteados
    
        console.log("VENCEDORES:");
        console.log(winners);
        console.log(winners[0].id)
        console.log("CAMPANHA ACABOU");

        donators.forEach(donator => {
            donator.campaignId = null
            donator.save()
        });

        
        winners.forEach(async winner => {
            await db.CampaignWinner.create({
                donatorId: winner.id,
                campaignId: campaign.id
            })
        })
        
        campaign.is_open = false
        await campaign.save()
    }
}

module.exports = raffleCampaign