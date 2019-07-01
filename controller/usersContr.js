const userdb = require("../model/userdb.js");




// 處理打開頁面時加載所有用戶
exports.getUsers = (req, res) =>
{
    userdb.myQuery("SELECT * FROM users", result =>
    {
        res.render("users", {result: result});
    });
}

// 處理添加新用戶
exports.adduser = (req, res) =>
{
    let obj = req.body;
    // let addSql = `INSERT INTO users (slug, email, password, nickname, avatar, bio, status) VALUES ("${obj.slug}", "${obj.email}", "${obj.password}", "${obj.nickname}", "/static/uploads/avatar.jpg", null, "activated")`;
    let addSql = `INSERT INTO users (slug, email, password, nickname, status) VALUES ("${obj.slug}", "${obj.email}", "${obj.password}", "${obj.nickname}", "activated")`;
    userdb.myQuery(addSql, results =>
    {
        let myres = {};
        if (results.affectedRows >= 1)
        {
            myres.msg = "添加成功！";
            myres.status = "200";
        }
        else
        {
            myres.msg = "出錯啦";
            myres.status = "400";
        }
        res.send(myres);
    });
}

// 處理後續加載所有用戶
exports.regetUsers = (req, res) =>
{
    userdb.myQuery("SELECT * FROM users", result =>
    {
        res.send(result);
    });
}

// 處理刪除用戶
exports.delUser = (req, res) =>
{
    let id = req.query.id;
    let delSql = `DELETE FROM users WHERE id = ${id}`;
    userdb.myQuery(delSql, result =>
    {
        let myres = {};
        if (result.affectedRows >= 1)
        {
            myres.msg = "刪除成功！";
            myres.status = "200";
        }
        else
        {
            myres.msg = "出錯啦";
            myres.status = "400";
        }
        res.send(myres);
    });
            
}