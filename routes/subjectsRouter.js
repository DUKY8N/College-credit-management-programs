const express = require('express');
const router = express.Router();
const subjectsController = require("../controller/subjectsController");
const authMiddleware = require("../middleware/authMiddleware");

//성적등록 (테스트완료)
router.post("/addScore", authMiddleware.isLoginStatus, subjectsController.addScore);

//성적수정 (테스트완료)
router.post("/changeScore", authMiddleware.isLoginStatus, subjectsController.changeScore);

//평균학점계산
//! 테스트 실패
router.post("/avgScore", authMiddleware.isLoginStatus, subjectsController.avgScore);

//졸업요건비교
//! 테스트 실패
router.post("/Graduated", authMiddleware.isLoginStatus, subjectsController.Graduated);

//학기별성적보기
//! 테스트 실패
router.post("/dateScore", authMiddleware.isLoginStatus, subjectsController.dateScore);

//성적정렬(오름차순)
//! 테스트 실패
router.post("/sortScoreAsc", authMiddleware.isLoginStatus, subjectsController.sortScoreAsc);

//성적정렬(내림차순)
//! 테스트 실패
router.post("/sortScoreDesc", authMiddleware.isLoginStatus, subjectsController.sortScoreDesc);

module.exports = router;