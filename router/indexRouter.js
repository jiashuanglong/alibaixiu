const express = require("express");
const indexContr = require("../controller/indexContr.js");
const router = express.Router();

// 登錄判斷中間件
router.use((req, res, next) =>
{
    const session = req.session.obj;
    if (session && session.email)
        next();
    else
    {
        // 判斷請求來源（異步對象還是瀏覽器），根據不同的來源響應不同的內容
        // 根據請求頭中是否擁有"x-requested-with"屬性判斷請求來源
        if (req.headers["x-requested-with"])
        {
            res.send({
                status: 400,
                msg: "您好，請登錄您的賬戶"
            });
        }
        else
            res.send("<script>alert('你好，請登錄您的賬號。');window.location='/login';</script>");
    }
});

router.get("/", indexContr.getIndex)  // 打開頁面時加載登錄頁面
    .get("/getAdminMsg", indexContr.getAdminMsg)  // 獲取管理員頭像、名字
    .get("/geRenZhongXin", indexContr.geRenZhongXin)  //進入個人中心

module.exports = router;