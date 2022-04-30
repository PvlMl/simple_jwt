const express = require('express');
const router = express.Router();
const controller = require("./controller");
const v = require('./middleware/validation');
const authToken = require('./middleware/chekToken');

router.post("/registration",v , controller.registration);
router.post("/login", controller.login);
router.get("/users", authToken, controller.getUsers);

module.exports = router;