module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "user",
        {
            user_id: {
                type: Sequelize.STRING,
            },
            action_type: {
                type: Sequelize.STRING,
            },
            action_description: {
                type: Sequelize.STRING,
            },
            created_at: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        },
        { timestamp: false }
    );
    return User;
};
