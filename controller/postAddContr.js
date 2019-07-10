const path = require("path");
const db = require("../model/baixiudb.js");
const formidable = require("formidable");

// 打開頁面時加載靜態頁面
exports.postAdd = (req, res) =>
{
    // 從數據庫加載所有分類
    let getCategoriesSql = `SELECT * FROM categories`;
    db.myQuery(getCategoriesSql, (err, results) =>
    {
        res.render("post-add", {results: results});
    });
}

// 提交文章
exports.addPost = (req, res) =>
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
        let feature;
        let addPstSql;
        if (files.feature)
        {
            let imgName = path.basename(files.feature.path);
            feature = "/assets/img/upload/" + imgName;
            addPstSql = `INSERT INTO posts (slug, title, feature, created, content, views, likes, status, user_id, category_id) VALUES ("${fields.slug}", "${fields.title}", "${feature}", "${fields.created}", "${fields.content}", 0, 0, "${fields.status}", "${req.session.obj.id}", "${fields.category}")`;
        }
        else
            addPstSql = `INSERT INTO posts (slug, title, created, content, views, likes, status, user_id, category_id) VALUES ("${fields.slug}", "${fields.title}", "${fields.created}", "${fields.content}", 0, 0, "${fields.status}", "${req.session.obj.id}", "${fields.category}")`;
        db.myQuery(addPstSql, (err, result) =>
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
                    msg: "提交文章成功！"
                });
            }
        });
    });
}