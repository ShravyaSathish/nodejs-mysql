const db = require("../model");
// const DATE_FORMATER = require("dateformat");
const path = require("path");
const rfs = require("rotating-file-stream");
const fs = require('fs')
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
function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}
function dateformatter(date) {
    var d = new Date(date);
    return (
        [
            d.getFullYear(),
            padTo2Digits(d.getMonth() + 1),
            padTo2Digits(d.getDate()),
        ].join("-") +
        " " +
        [
            padTo2Digits(d.getHours()),
            padTo2Digits(d.getMinutes()),
            padTo2Digits(d.getSeconds()),
        ].join(":")
    );
}

exports.getdata = (req, res) => {
    let offset = 0;
    User.findAndCountAll()
        .then((data) => {
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);
            let action_type = req.query.action_type;

            let startDate;
            let endDate;
            if (!req.query.action_type) {
                //. represents any character / * represents zero or more characters
                action_type = `.*`;
            }
            if (!req.query.startDate || !req.query.endDate) {
                startDate = dateformatter("2023-02-14 15:39:47");
                endDate = dateformatter(Date.now());
            } else {
                startDate = dateformatter(req.query.startDate);
                endDate = dateformatter(req.query.endDate);
            }
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
                    [Op.or]: [
                        {
                            action_type: {
                                [Op.regexp]: action_type,
                            },
                        },
                        {
                            created_at: {
                                [Op.between]: [startDate, endDate],
                            },
                        },
                    ],
                },
                order: [["created_at", "ASC"]],
                limit: limit,
                offset: offset,
            }).then(async (results) => {
                let writeStream = fs.createWriteStream('tmp/logs.csv')
                results.forEach(async(result)=>{
                    writeStream.write(JSON.stringify(result) + '\n')

                })
                writeStream.end()
                writeStream.on('finish', ()=>{
                    res.status(200).json({
                        data: results,
                        count: data.count,
                        currentPage: page,
                        overallPages: pages,
                    });
                }).on('error', (err)=>{
                    res.send({message:"error"})
                })
              

                
                
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(200).json({ message: "internal server error" });
        });
};
