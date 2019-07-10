const express = require("express");
const loginContr = require("../controller/loginContr.js");
const router = express.Router();

router.get("/login", loginContr.getLogin)  // 打開頁面時加載登錄頁面
    .post("/postLogin", loginContr.postLogin)  // 提交登錄
    .get("/logout", loginContr.logout);  //退出登錄

module.exports = router;