require("dotenv/config");

module.exports = {
  "development": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "dialect": process.env.DBDIALECT
  },
  "test": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "dialect": process.env.DBDIALECT,
    "node_env": process.env.NODE_ENV
  },
  "production": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "dialect": process.env.DBDIALECT
  }
};
