const { Random } = require('random-js')
const db = require('./models')
const moment = require('moment')

const random = new Random()
const today = moment().format("YYYY-MM-DD");


const raffleCampaign = async function (campaign) {
    if (campaign.end_date >= today) {
        const numberWinners = campaign.number_winners
        console.log(numberWinners)
    
        const donators = await db.Donator.findAll({where: {campaignId: campaign.id}})
        console.log(donators)
    
        // Sortear aleatoriamente os vencedores sem repetição
        const numDonators = donators.length;
        const indices = Array.from({ length: numDonators }, (_, i) => i); // criar array de índices dos doadores
        const winnersIndices = random.sample(indices, Math.min(numberWinners, numDonators), false); // sortear índices aleatórios sem repetição
        const winners = winnersIndices.map(i => donators[i]); // selecionar os doadores correspondentes aos índices sorteados
    
        console.log("VENCEDORES:");
        console.log(winners);
        console.log(winners[0].id)
        console.log("CAMPANHA ACABOU");

        // campaign is_open = false, e os usuarios nao veem ou nao podem se inscrever mais nela
    }
}

module.exports = raffleCampaign