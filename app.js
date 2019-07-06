// 引入第三方模塊
const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
// 引入路由文件模塊
const loginRouter = require("./router/loginRouter.js");
const indexRouter = require("./router/indexRouter.js");
const usersRouter = require("./router/usersRouter.js");
const categoriesRouter = require("./router/categoriesRouter.js");
// 創建服務器
const app = express();

const bodyParser = require("body-parser");

// 配置ejs模板引擎
app.set("views", "./views");  //設置模板引擎靜態頁面
app.set("view engine", "ejs");  //設置渲染模板使用的引擎

// 註冊 session
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
}));

// 接收post參數的配置
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 統一處理靜態資源配置
app.use(express.static("views"));
app.use("/assets", express.static("assets"));
app.use("/static", express.static("assets"));

// 使用路由
app.use(loginRouter);
app.use(indexRouter);
app.use(usersRouter);
app.use(categoriesRouter);



// 開啟服務器
app.listen(3000);