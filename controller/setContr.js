const path = require("path");
const db = require("../model/baixiudb.js");
const formidable = require("formidable");

// 得到導航菜單頁面
exports.getNavMenusPage = (req, res) =>
{
    res.render("nav-menus", {});
}

// 渲染導航菜單
exports.getNavMenus = (req, res) =>
{
    let Sql = `SELECT value FROM options WHERE options.key = "nav_menus"`;
    db.myQuery(Sql, (err, result) =>
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
                msg: "添加成功！",
                data: result
            });
        }
    });
}

// 添加一個菜單
exports.addNavMenu = (req, res) =>
{
    // 從數據庫獲取所有導航菜單
    let getNavMenusSql = `SELECT value FROM options WHERE options.key = "nav_menus"`;
    db.myQuery(getNavMenusSql, (err, result) =>
    {
        if (err)
        {
            res.send({
                status: 400,
                msg: "獲取導航菜單數據出錯！"
            });
        }
        else
        {
            let arr = JSON.parse(result[0].value);
            arr.push(req.body);
            let arr2 = JSON.stringify(arr);
            // 數據庫內容有雙引號，所以這裡要用單引號
            let editNavMenusSql = `UPDATE options SET value = '${arr2}' WHERE options.key = 'nav_menus'`;
            db.myQuery(editNavMenusSql, (err1, result1) =>
            {
                if (err1)
                {
                    res.send({
                        status: 401,
                        msg: "寫入導航數據出錯！"
                    });
                }
                else
                {
                    res.send({
                        status: 200,
                        msg: "添加成功！"
                    });
                }
            })
        }
    });
}