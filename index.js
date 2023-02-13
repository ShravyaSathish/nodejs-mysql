const express = require("express");
require("./config/databaseconnection");
const app = express();
const port = process.env.PORT || 3000;
app.use(express());

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
