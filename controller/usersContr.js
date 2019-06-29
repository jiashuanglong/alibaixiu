const userdb = require("../model/userdb.js");
exports.getUsers = (req, res) =>
{
    console.log("開始處理請求");
    userdb.myQuery("SELECT * FROM users", result =>
    {
        console.log("在最終，已經返回結果");
        res.render("users", {result: result});
    });
}