const db = require("../model/baixiudb.js");

// 打開頁面時加載登錄頁面
exports.getLogin = (req, res) =>
{
    res.render("login", {});
}

// 提交登錄
exports.postLogin = (req, res) =>
{
    let body = req.body;
    db.myQuery("SELECT * FROM users", (err, result) =>
    {
        if (err)
        {
            res.send({
                status: 400,
                msg: "驗證出錯"
            });
        }
        else
        {
            for (let i = 0; i < result.length; i++)
            {
                if (result[i].email == body.email)
                {
                    if (body.password == result[i].password)
                    {
                        // 用session保存用戶信息
                        req.session.obj = {
                            email: result[i].email,
                            password: result[i].password,
                            nickname: result[i].nickname,
                            avatar: result[i].avatar,
                            slug: result[i].slug,
                            bio: result[i].bio,
                            id: result[i].id,
                        };
                        res.send({
                            status: 200,
                            msg: "登錄成功",
                        });
                    }
                    else
                    {
                        res.send({
                            status: 300,
                            msg: "密碼錯誤"
                        });
                    }
                    break;
                }
                if (i == result.length - 1)
                {
                    res.send({
                        status: 301,
                        msg: "郵箱不存在"
                    });
                }
            }
        }
    });
}

// 退出登錄
exports.logout = (req, res) =>
{
    delete req.session.obj;
    if (req.session.obj)
    {
        res.send({
            status: 400,
            msg: "未成功退出"
        });
    }
    else
    {
        res.send({
            status: 200,
            msg: "已退出登錄"
        });
    }
}