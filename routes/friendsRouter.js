const express = require('express');
const router = express.Router();
const friendsController = require("../controller/friendsController");
const authMiddleware = require("../middleware/authMiddleware");

//친구 목록
router.get("/myFriends", authMiddleware.isLoginStatus, friendsController.getMyFriendsList);

//친구 추가
router.post("/addFriend", authMiddleware.isLoginStatus, friendsController.addFriend);

//친구 삭제
router.post("/deleteFriend", authMiddleware.isLoginStatus, friendsController.deleteFriend);

//성적비교
router.post("/compareScore", authMiddleware.isLoginStatus, friendsController.compareScore);
module.exports = router;