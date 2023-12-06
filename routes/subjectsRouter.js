const express = require('express');
const router = express.Router();
const subjectsController = require("../controller/subjectsController");
const authMiddleware = require("../middleware/authMiddleware");
//! 전부 포스트맨으로 테스트 필요.

//성적등록
router.post("/addScore", authMiddleware.isLoginStatusOrRedirect, subjectsController.addScore);

//성적수정
router.post("/changeScore", authMiddleware.isLoginStatusOrRedirect, subjectsController.changeScore);

//평균학점계산
router.post("/avgScore", authMiddleware.isLoginStatusOrRedirect, subjectsController.avgScore);

//졸업요건비교
router.post("/Graduated", authMiddleware.isLoginStatusOrRedirect, subjectsController.Graduated);

//학기별성적보기
router.post("/dateScore", authMiddleware.isLoginStatusOrRedirect, subjectsController.dateScore);

//성적정렬(오름차순)
router.post("/sortScoreAsc", authMiddleware.isLoginStatusOrRedirect, subjectsController.sortScoreAsc);

//성적정렬(내림차순)
router.post("/sortScoreDesc", authMiddleware.isLoginStatusOrRedirect, subjectsController.sortScoreDesc);

module.exports = router;