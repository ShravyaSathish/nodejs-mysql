module.exports = (app) => {
    const router = require("express").Router();
    const userinfo = require("../controller/user");
    router.post("/userInfo", userinfo.adduserinfo);
    router.get("/getdata", userinfo.getdata);
    app.use(router);
};
