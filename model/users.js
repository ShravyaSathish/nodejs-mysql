module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
        },
    });
};
