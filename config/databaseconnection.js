const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("assignment", "root", "password", {
    host: "localhost",
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected Successfully");
    })
    .catch((error) => {
        console.log("Unable to connect to a database!", +error);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../model/users")(sequelize, DataTypes);
