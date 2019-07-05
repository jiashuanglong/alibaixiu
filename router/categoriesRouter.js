const express = require("express");
const categoriesContr = require("../controller/categoriesContr.js");
const router = express.Router();


router.get("/categories", categoriesContr.getCategories)  // 打開頁面時加載靜態頁面
    .get("/renderpage", categoriesContr.renderPage)  // 渲染頁面
    .post("/addcategories", categoriesContr.addCategories)  // 添加新分類
    .get("/getCategoriesById", categoriesContr.getCategoriesById)  // 點擊編輯按鈕
    .post("/editCategories", categoriesContr.editCategories)  // 提交修改分類
    .get("/delCategories", categoriesContr.delCategories);  // 刪除單個分類

module.exports = router;