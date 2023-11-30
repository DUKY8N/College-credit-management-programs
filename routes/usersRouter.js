const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");

router.post("/signUp", usersController.signUp);

module.exports = router;
