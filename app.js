const express = require("express");
const ejs = require("ejs");
const demoRouter = require("./router/demoRouter.js");
const usersRouter = require("./router/usersRouter.js");
const app = express();

// 配置ejs末班引擎
app.set("views", "./views");  //設置模板引擎靜態頁面
app.set("view engine", "ejs");  //設置渲染模板使用的引擎

app.use("/assets", express.static("assets"));
app.use("/static", express.static("assets"));

app.use(demoRouter);
app.use(usersRouter);

app.listen(3000);