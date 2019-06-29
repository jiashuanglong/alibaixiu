const express = require("express");
const demoContr = require("../controller/demoContr.js");
const router = express.Router();

router.get("/demo", (req, res) =>
{
    demoContr.getDemo(req, res);
});

module.exports = router;