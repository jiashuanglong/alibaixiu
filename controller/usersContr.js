const db = require("../model/baixiudb.js");

// 處理打開頁面時加載所有用戶
exports.getUsers = (req, res) =>
{
    db.myQuery("SELECT * FROM users", (err, result) =>
    {
        
        if (err)
        {
            res.send("出錯啦！");
        }
        else
            res.render("users", {result: result});
    });
}

// 處理添加新用戶
exports.adduser = (req, res) =>
{
    let obj = req.body;
    // let addSql = `INSERT INTO users (slug, email, password, nickname, avatar, bio, status) VALUES ("${obj.slug}", "${obj.email}", "${obj.password}", "${obj.nickname}", "/static/uploads/avatar.jpg", null, "activated")`;
    let addSql = `INSERT INTO users (slug, email, password, nickname, status) VALUES ("${obj.slug}", "${obj.email}", "${obj.password}", "${obj.nickname}", "activated")`;
    db.myQuery(addSql, (err, result) =>
    {
        if (err)
        {
            res.send({
                status: 400,
                msg: "出錯啦！"
            });
        }
        else
        {
            res.send({
                status: 200,
                msg: "添加成功！"
            });
        }
    });
}

// 處理後續加載所有用戶
exports.regetUsers = (req, res) =>
{
    db.myQuery("SELECT * FROM users", (err, result) =>
    {
        if (err)
        {
            res.send({
                status: 400,
                msg: "出錯啦！"
            });
        }
        else
        {
            res.send({
                status: 200,
                msg: "查詢成功！",
                data: result
            });
        }
    });
}

// 處理刪除用戶
exports.delUser = (req, res) =>
{
    let id = req.query.id;
    let delSql = `DELETE FROM users WHERE id = ${id}`;
    db.myQuery(delSql, (err, result) =>
    {
        if (err)
        {
            res.send({
                status: 400,
                msg: "出錯啦！"
            });
        }
        else
        {
            res.send({
                status: 200,
                msg: "刪除成功！"
            });
        }
    });
}

// 處理點擊編輯用戶
exports.getProfile = (req, res) =>
{
    let id = req.query.id;
    let getUser = `SELECT * FROM users WHERE id = ${id}`;
    db.myQuery(getUser, (err, result) =>
    {
        if (err)
            alert("出錯啦！");
        else
            res.render("profile", result[0]);
    });
}

// 處理提交編輯用戶
exports.postProfile = (req, res) =>
{
    let body = req.body;
    let profileUser = `UPDATE users SET slug = "${body.slug}", nickname = "${body.nickname}", bio = "${body.bio}" WHERE id = ${body.id}`;
    db.myQuery(profileUser, (err, result) =>
    {
        if (err)
        {
            res.send({
                status: 400,
                msg: "出錯啦！"
            });
        }
        else
        {
            res.send({
                status: 200,
                msg: "修改成功！"
            });
        }
    });
}