const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models')
const path = require('path')

const Cronjob = require('cron').CronJob
const raffleCampaign = require('./raffleCampaign')
const moment = require('moment')
const today = moment().format("YYYY-MM-DD");

const API = require('./routes/API.js');
const CronJob = require('cron').CronJob
const sendEmail = require('./sendEmail')

const app = Express();
const PORT = process.env.PORT || 5000;
dotenv.config()

app.use(cors())
app.use('/files', Express.static(path.resolve(__dirname, "public", "uploads")));

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));

app.use('/', API);

let isSendingEmail = false

const send_emails = new CronJob('*/1 * * * * *', async function() {
    if (isSendingEmail) {
        return
    }

    isSendingEmail = true
    
    const emails = await db.Email.findAll();
    for (const email of emails) {
        await sendEmail(email);
    }

    isSendingEmail = false
    console.log("ENVIAR EMAILS")
}, null, true, 'America/Sao_Paulo');

const verify_campaigns = new Cronjob('1 0 * * * *', async function() {
    const campaigns = await db.Campaign.findAll({
        where: {is_open: true},
        include: [{ model: db.Admin, as: 'admin', include: [{ model: db.User }]}]
    })
    console.log("VERIFICANDO CAMPANHAS")
    campaigns.forEach(async (campaign) => {
        if (campaign.end_date >= today) {
            await raffleCampaign(campaign)
        }
    });
}, null, true, 'America/Sao_Paulo');

const startServer = async () => {
    await db.sequelize.sync();
    app.listen(PORT, () => console.log('Servidor escutando na porta: ' + PORT));
    send_emails.start();
    verify_campaigns.start();
};

startServer();