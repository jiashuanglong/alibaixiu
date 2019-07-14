const path = require("path");
const moment = require("moment");
const db = require("../model/baixiudb.js");
const formidable = require("formidable");

// 打開靜態頁面，渲染下拉選擇框
exports.getPostsPage = (req, res) =>
{
    // 獲取所有分類用於渲染頁面分類選擇按鈕
    let getCategoriesSql = `SELECT * FROM categories`;
    db.myQuery(getCategoriesSql, (err, results) =>
    {
        res.render("posts", {results: results});
    });
}

// 渲染文章列表
exports.getPosts = (req, res) =>
{
    let category = req.query.category;  // 分類
    let status = req.query.status;  // 狀態
    let page = req.query.page;  // 頁碼
    let everyPage = req.query.everyPage;  // 頁容量
    let n = everyPage * (page - 1);

    // 判斷有無選擇分類、狀態
    let tiaojian = "";
    // 判斷有無選擇分類
    if (category != 0)
        tiaojian += `AND category_id = "${category}" `;
    // 判斷有無選擇狀態
    if (status != 0)
        tiaojian += `AND status = "${status}" `;
    
    // 查詢文章表，聲明用戶表和狀態表查詢範圍
    let getPostsSql = `SELECT posts.*,users.nickname,categories.name FROM posts `;
    // 與用戶表聯表查詢
    getPostsSql += `LEFT JOIN users ON posts.user_id = users.id `;
    // 與狀態表鏈錶查詢
    // WHERE true單獨無效果，為後面拼接做準備
    getPostsSql += `LEFT JOIN categories ON posts.category_id = categories.id WHERE true ${tiaojian}`;
    
    // 因為最新發表的文章要顯示在最上面，所以得到的數據需要倒敘排列
    getPostsSql += `ORDER BY posts.id DESC `;
    // 頁碼，頁容量
    getPostsSql += `LIMIT ${n},${everyPage}; `;
    // 獲取文章總數
    getPostsSql += `SELECT COUNT(*) FROM posts WHERE true ${tiaojian}`;

    db.myQuery(getPostsSql, (err, results) =>
    {
        res.send(results);
    });
}

// 進入編輯文章頁面
exports.postsContr = (req, res) =>
{
    let getPostSql = `SELECT * FROM posts WHERE id = ${req.query.id}`;
    db.myQuery(getPostSql, (err, result) =>
    {
        if (err) return;
        res.render("post-edit", result[0]);
    });
}

// 批量刪除文章
exports.deleteBatchPost = (req, res) =>
{
    let delSql = `DELETE FROM posts WHERE id in (${req.query.id})`;
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

// 提交編輯文章
exports.sumitPostEdit = (req, res) =>
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
            addPstSql = `UPDATE posts SET title = "${fields.title}", content = "${fields.content}", slug = "${fields.slug}", feature = "${feature}", category_id = "${fields.category}", created = "${fields.created}", status = "${fields.status}" WHERE id = ${fields.id}`;
        }
        else
            addPstSql = `UPDATE posts SET title = "${fields.title}", content = "${fields.content}", slug = "${fields.slug}", category_id = "${fields.category}", created = "${fields.created}", status = "${fields.status}" WHERE id = ${fields.id}`;
        db.myQuery(addPstSql, (err, result) =>
        {
            if (err)
            {
                console.log(err);
                
                res.send({
                    status: 400,
                    msg: "出錯啦！"
                });
            }
            else
            {
                res.send({
                    status: 200,
                    msg: "編輯文章成功！"
                });
            }
        });
    });
}