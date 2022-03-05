const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelizeConnection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeConnection = sequelizeConnection;

db.userModel = require("./user.js")(sequelizeConnection, Sequelize);

module.exports = db;