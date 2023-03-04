import  Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

import test from './routes/test.js'

const app = Express();
const PORT = process.env.PORT || 5000;

dotenv.config()
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

app.listen(PORT, () => console.log('Servidor escutando na porta: '+ PORT));


app.use('/testes', test);

var client = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

await client.connect()
/* const res = await client.query('SELECT * FROM teste')
console.log(res.rows)
*/

//await client.end()


