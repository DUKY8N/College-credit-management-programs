const express = require('express');
const router = express.Router();
const indexController = require("../controller/indexController");
const authMiddleware = require("../middleware/authMiddleware");

module.exports = router;