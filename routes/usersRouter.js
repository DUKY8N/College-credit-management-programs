const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");

router.post("/signUp", usersController.signUp);
router.post("/idCheck", usersController.idCheck);

module.exports = router;
