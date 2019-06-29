const express = require("express");
const usersContr = require("../controller/usersContr.js");
const router = express.Router();

router.get("/users", (req, res) =>
{
    usersContr.getUsers(req, res);
});

module.exports = router;