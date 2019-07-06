const express = require("express");
const loginContr = require("../controller/loginContr.js");
const router = express.Router();

// router.use((req, res, next) =>
// {
//     console.log(req.getHeader("X-Requested-With"));
//     next();
// });

router.get("/login", loginContr.getLogin)  // 打開頁面時加載登錄頁面
    .post("/postLogin", loginContr.postLogin)  // 提交登錄

module.exports = router;