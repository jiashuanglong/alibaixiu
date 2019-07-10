const express = require("express");
const postAddContr = require("../controller/postAddContr.js");
const router = express.Router();


router.get("/postAdd", postAddContr.postAdd)  // 打開頁面時加載靜態頁面
    .post("/addPost", postAddContr.addPost)  // 提交文章

module.exports = router;