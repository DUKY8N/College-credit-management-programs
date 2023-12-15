const express = require('express');
const router = express.Router();
const indexController = require("../controller/indexController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/", (req, res) => res.redirect("/myGrades"));
router.get("/myGrades", authMiddleware.isLoginStatusOrRedirect, indexController.getMyGradesPage);
router.get(
    "/myGrades/:date/:scoreFilter/:scoreSort/:scoreOrder/:graduatedFilter/:graduatedSort/:graduatedOrder",
    authMiddleware.isLoginStatusOrRedirect, indexController.getMyGradesPage
);
router.get("/myFriends", authMiddleware.isLoginStatusOrRedirect, indexController.getMyFriendsPage);
router.get("/login", authMiddleware.isLogoutStatusOrRedirect, indexController.getLogInPage);
router.get("/signup", authMiddleware.isLogoutStatusOrRedirect, indexController.getSignUpPage);
router.get("/accountSettings", authMiddleware.isLoginStatusOrRedirect, indexController.getAccountSettingsPage);

module.exports = router;