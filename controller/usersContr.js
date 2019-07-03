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

// 處理點擊編輯用戶
exports.getProfile = (req, res) =>
{
    let id = req.query.id;
    let getUser = `SELECT * FROM users WHERE id = ${id}`;
    userdb.myQuery(getUser, result =>
    {
        res.render("profile", result[0]);
    });
}

// 處理提交編輯用戶
exports.postProfile = (req, res) =>
{
    let body = req.body;
    let profileUser = `UPDATE users SET slug = "${body.slug}", nickname = "${body.nickname}", bio = "${body.bio}" WHERE id = ${body.id}`;
    userdb.myQuery(profileUser, result =>
    {
        let myres = {};
        if (result.affectedRows >= 1)
        {
            myres.msg = "修改成功！";
            myres.status = "200";
        }
        else
        {
            myres.msg = "出錯啦";
            myres.status = "400";
        }
        res.send(myres);
        // if (result.affectedRows >= 1)
        //     res.send("<script>alert('修改成功！');window.location='http://localhost:3000/users';</script>");
        // else
        //     res.send("<script>alert('出錯啦！');</script>");
    });
}