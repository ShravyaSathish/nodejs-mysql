const db = require("../model");
// const DATE_FORMATER = require("dateformat");
const User = db.users;
const Op = db.Sequelize.Op;
exports.adduserinfo = (req, res) => {
    const adduser = {
        user_id: req.body.user_id,
        action_type: req.body.action_type,
        action_description: req.body.action_description,
    };
    User.create(adduser)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Tutorial.",
            });
        });
};

exports.getdata = (req, res) => {
    let offset = 0;
    User.findAndCountAll()
        .then((data) => {
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);
            let action_type = req.query.action_type;
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;

            console.log(startDate);
            console.log(endDate);
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            User.findAll({
                attributes: [
                    "user_id",
                    "action_type",
                    "action_description",
                    "created_at",
                ],
                where: {
                    created_at: {
                        [Op.between]: [startDate, endDate],
                    },
                    action_type: {
                        [Op.like]: `%${action_type}%`,
                    },
                },
                order: [["created_at", "ASC"]],
                limit: limit,
                offset: offset,
            }).then((result) => {
                res.status(200).json({
                    data: result,
                    count: data.count,
                    currentPage: page,
                    overallPages: pages,
                });
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(200).json({ message: "internal server error" });
        });
};
