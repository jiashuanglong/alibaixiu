const express = require("express");
const postsContr = require("../controller/postsContr.js");
const router = express.Router();


router.get("/getPostsPage", postsContr.getPostsPage)  // 打開靜態頁面，渲染下拉選擇框
    .get("/getPosts", postsContr.getPosts)  // 渲染文章列表
    .get("/deleteBatchPost", postsContr.deleteBatchPost) // 批量刪除文章
    .get("/postEdit", postsContr.postsContr)  // 進入編輯文章頁面
    .post("/sumitPostEdit", postsContr.sumitPostEdit)  // 提交編輯文章

module.exports = router;