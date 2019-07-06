const db = require("../model/baixiudb.js");

// 打開頁面時加載首頁
exports.getIndex = (req, res) =>
{
    res.render("index", {});
}