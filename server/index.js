const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models')
const path = require('path')

const Cronjob = require('cron').CronJob
const raffleCampaign = require('./raffleCampaign')

const API = require('./routes/API.js');

const app = Express();
const PORT = process.env.PORT || 5000;

dotenv.config()

app.use('/files', Express.static(path.resolve(__dirname, "public", "uploads")));

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

app.use('/', API);

const verify_campaigns = new Cronjob('10/59 * * * * *', async function() {
    const campaigns = await db.Campaign.findAll({where: {is_open: true}})

    console.log("VERIFICANDO CAMPANHAS")
    campaigns.forEach((campaign) => {
        raffleCampaign(campaign)
    });
}, null, true, 'America/Sao_Paulo');

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => console.log('Servidor escutando na porta: '+ PORT))
    verify_campaigns.start()
})
