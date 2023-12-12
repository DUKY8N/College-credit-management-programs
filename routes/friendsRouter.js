const express = require('express');
const router = express.Router();
const friendsController = require("../controller/friendsController");
const authMiddleware = require("../middleware/authMiddleware");


//친구 추가
router.post("/addFriend", authMiddleware.isLogoutStatus, friendsController.addFriend);

//친구 삭제
router.post("/deleteFriend", authMiddleware.isLogoutStatus, friendsController.deleteFriend);

//성적비교
router.post("/compareScore", authMiddleware.isLogoutStatus, friendsController.compareScore);
module.exports = router;