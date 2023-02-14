const express = require("express");
const models = require("./model");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/user")(app);
models.sequelize
    .sync()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(port, () => {
            console.log(`Server is up on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("unable to connect");
    });
