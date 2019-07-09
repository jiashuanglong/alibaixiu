const db = require("../model/baixiudb.js");

// 打開頁面時加載首頁
exports.getIndex = (req, res) =>
{
    res.render("index", {});
}

// 獲取管理員頭像、名字
exports.getAdminMsg = (req, res) =>
{
    res.send(req.session.obj);
}

//進入個人中心
exports.geRenZhongXin = (req, res) =>
{
    res.render("geRenZhongXin", req.session.obj);
}