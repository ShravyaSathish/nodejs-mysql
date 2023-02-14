const dbconfig = require("../config/databaseconnection");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.user,
    dbconfig.password,
    {
        host: dbconfig.host,
        dialect: dbconfig.dialect,
    }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("./users")(sequelize, Sequelize);
module.exports = db;
