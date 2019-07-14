const moment = require("moment");
const db = require("../model/baixiudb.js");

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
    console.log("請求來了");
    
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