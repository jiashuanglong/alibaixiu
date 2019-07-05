const express = require("express");
const ejs = require("ejs");
const demoRouter = require("./router/demoRouter.js");
const usersRouter = require("./router/usersRouter.js");
const categoriesRouter = require("./router/categoriesRouter.js");
const app = express();

const bodyParser = require("body-parser");

// 配置ejs模板引擎
app.set("views", "./views");  //設置模板引擎靜態頁面
app.set("view engine", "ejs");  //設置渲染模板使用的引擎

// 接收post參數的配置
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static("views"));
app.use("/assets", express.static("assets"));
app.use("/static", express.static("assets"));

app.use(demoRouter);
app.use(usersRouter);
app.use(categoriesRouter);

app.listen(3000);