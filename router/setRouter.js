const express = require("express");
const setContr = require("../controller/setContr.js");
const router = express.Router();


router.get("/getNavMenusPage", setContr.getNavMenusPage)  // 得到導航菜單頁面
    .get("/getNavMenus", setContr.getNavMenus)  // 渲染導航菜單
    .post("/addNavMenu", setContr.addNavMenu)  // 添加一個菜單

module.exports = router;