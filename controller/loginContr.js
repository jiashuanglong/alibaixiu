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
                        // 用session保存用戶名
                        req.session.obj = {
                            email: result[i].email,
                            password: result[i].password,
                            nickname: result[i].nickname,
                            avatar: result[i].avatar
                        };
                        res.send({
                            status: 200,
                            msg: "登錄成功"
                        });
                    }
                    else
                    {
                        res.send({
                            status: 201,
                            msg: "密碼錯誤"
                        });
                    }
                    break;
                }
                if (i == result.length - 1)
                {
                    res.send({
                        status: 203,
                        msg: "郵箱不存在"
                    });
                }
            }
        }
    });
}