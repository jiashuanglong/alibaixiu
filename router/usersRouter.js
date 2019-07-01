const express = require("express");
const usersContr = require("../controller/usersContr.js");
const router = express.Router();

// 處理打開頁面時加載所有用戶
router.get("/users", (req, res) =>
{
    usersContr.getUsers(req, res);
});

// 處理添加新用戶
router.post("/adduser", (req, res) =>
{
    usersContr.adduser(req, res);
});

// 處理後續加載所有用戶
router.get("/regetusers", (req, res) =>
{
    usersContr.regetUsers(req, res);
});

// 處理刪除用戶
router.get("/deluser", (req, res) =>
{
    usersContr.delUser(req, res);
});

module.exports = router;