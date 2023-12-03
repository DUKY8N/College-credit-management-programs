const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");

//회원가입
router.post("/signUp", usersController.signUp);

//아이디중복확인
router.post("/idCheck", usersController.idCheck);

//로그인
router.post("/logIn", usersController.logIn);

//로그아웃
router.post("/logOut", usersController.logOut);

module.exports = router;
