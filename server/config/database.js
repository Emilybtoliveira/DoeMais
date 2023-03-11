import Sequelize from "sequelize";

var db = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        dialect: "postgres",
        host: process.env.PGHOST,
    }
);

export default db;