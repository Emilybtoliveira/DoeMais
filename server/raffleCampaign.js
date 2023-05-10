const { Random } = require('random-js')
const db = require('./models')

const random = new Random()

const raffle = async function(campaign, donators) {
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

    winners.forEach(async winner => {
        await db.CampaignWinner.create({
            donatorId: winner.id,
            campaignId: campaign.id
        })
    })

    const winnersInfo = winners.map(winners => `${winners.User.name} - ${winners.User.email}`);

    const emailBody = `<p>Olá,</p><p>Organizador da campanha: ${campaign.admin.User.name} - ${campaign.admin.User.email}</p><p>Premio da campanha: ${campaign.reward}</p><p>Agradecemos a participação dos seguintes doadores:</p><ul>${winnersInfo.map(info => `<li>${info}</li>`).join('')}</ul><p>Obrigado por ajudar a salvar vidas!</p>`;

    await db.Email.create({
        to: 'doemais23@gmail.com',
        subject: 'Lista de doadores',
        html: emailBody
    });

    console.log("SORTEOU")
}

const raffleCampaign = async function (campaign) {
    const donators = await db.Donator.findAll({
        where: {campaignId: campaign.id},
        include: [{ model: db.User }]
    })

    if (campaign.reward) {
        await raffle(campaign, donators)
    }

    donators.forEach(async donator => {
        donator.campaignId = null
        await donator.save()
    });

    campaign.is_open = false
    await campaign.save()
}

module.exports = raffleCampaign