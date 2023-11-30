const express = require('express');
const router = express.Router();
const indexController = require("../controller/indexController");


router.get("/", indexController.getMyGradesPage);
router.get("/login", indexController.getLogInPage);
router.get("/signup", indexController.getSignUpPage);
router.get("/accountSettings", indexController.getAccountSettingsPage);

module.exports = router;