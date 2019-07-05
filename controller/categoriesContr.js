const db = require("../model/baixiudb.js");

// 打開頁面時加載靜態頁面
exports.getCategories = (req, res) =>
{
    res.render("categories", {});
}

// 渲染頁面
exports.renderPage = (req, res) =>
{
    db.myQuery("SELECT * FROM categories", (err, result) =>
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

// 添加新分類
exports.addCategories = (req, res) =>
{
    let body = req.body;
    let addSql = `INSERT INTO categories (name ,slug) VALUES ("${body.name}", "${body.slug}")`;
    db.myQuery(addSql, (err, results) =>
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

// 點擊編輯按鈕
exports.getCategoriesById = (req, res) =>
{
    let id = req.query.id;
    let getSql = `SELECT * FROM categories WHERE id = ${id}`;
    db.myQuery(getSql, (err, results) =>
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
                data: results
            });
        }
    });
}

// 提交修改分類
exports.editCategories = (req, res) =>
{
    let body = req.body;
    let editSql = `UPDATE categories SET slug = "${body.slug}", name = "${body.name}" WHERE id = ${body.id}`;
    db.myQuery(editSql, (err, results) =>
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

// 刪除單個分類
exports.delCategories = (req, res) =>
{
    let id = req.query.id;
    let delSql = `DELETE FROM categories WHERE id = ${id}`;
    db.myQuery(delSql, (err, results) =>
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