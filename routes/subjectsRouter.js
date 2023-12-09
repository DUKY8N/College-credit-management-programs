const express = require('express');
const router = express.Router();
const subjectsController = require("../controller/subjectsController");
const authMiddleware = require("../middleware/authMiddleware");

//*성적등록 (테스트완료)
router.post("/addScore", authMiddleware.isLoginStatus, subjectsController.addScore);

//*성적수정 (테스트완료)
router.post("/changeScore", authMiddleware.isLoginStatus, subjectsController.changeScore);

//*평균학점계산 (테스트완료)
router.post("/avgScore", authMiddleware.isLoginStatus, subjectsController.avgScore);

//*졸업요건비교 (테스트완료)
router.post("/Graduated", authMiddleware.isLoginStatus, subjectsController.Graduated);

//*학기별성적보기 (테스트완료)
router.post("/dateScore", authMiddleware.isLoginStatus, subjectsController.dateScore);

//*들은과목수확인 (테스트완료)
router.post("/listenSubject", authMiddleware.isLoginStatus, subjectsController.listenSubject);

//*통합정렬
router.post("/totalscore", authMiddleware.isLoginStatus, subjectsController.filterAndSortScores);

module.exports = router;