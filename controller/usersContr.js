const path = require("path");
const db = require("../model/baixiudb.js");
const formidable = require("formidable");

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
    let form = new formidable.IncomingForm();
    // 保留上傳的圖片的擴展名
    form.keepExtensions = true;
    // 設置上傳圖片保存地址
    const imgPath = path.join(__dirname, "../assets/img/upload");
    form.uploadDir = imgPath;
    form.parse(req, (err, fields, files) =>
    {
        if (err) return;
        let avatar;
        let profileUser;
        if (files.avatar)
        {
            let imgName = path.basename(files.avatar.path);
            avatar = "/assets/img/upload/" + imgName;
            profileUser = `UPDATE users SET slug = "${fields.slug}", nickname = "${fields.nickname}", bio = "${fields.bio}",  avatar = "${avatar}" WHERE id = ${fields.id}`;
        }
        else
            profileUser = `UPDATE users SET slug = "${fields.slug}", nickname = "${fields.nickname}", bio = "${fields.bio}" WHERE id = ${fields.id}`;
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
                // 如果修改的是登錄的賬戶，需要重新設置xession
                if (fields.id == req.session.obj.id)
                {
                    let getUser = `SELECT * FROM users WHERE id = ${fields.id}`;
                    db.myQuery(getUser, (err1, result) =>
                    {
                        if (err1) console.log(err1);
                        req.session.obj = {
                            email: result[0].email,
                            password: result[0].password,
                            nickname: result[0].nickname,
                            avatar: result[0].avatar,
                            slug: result[0].slug,
                            bio: result[0].bio,
                            id: result[0].id,
                        };
                        // 因為是異步請求，有可能已經返回了這裡還沒改變session，所以返回得寫兩遍
                        res.send({
                            status: 200,
                            msg: "修改成功！"
                        });
                    });
                }
                else
                {
                    res.send({
                        status: 200,
                        msg: "修改成功！"
                    });
                }
            }
        });
    });
}