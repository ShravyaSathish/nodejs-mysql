module.exports = {
    host: "localhost",
    user: "root",
    password: "password",
    dialect: "mysql",
    database: "eventlog",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
