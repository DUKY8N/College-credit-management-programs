const createError = require("http-errors");
const usersController = require("../controller/usersController");
const subjectsModel = require("../model/subjectsModel");
const usersModel = require("../model/usersModel");

function getYearAndHalf() {
    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
    let half;

    // 1월부터 6월은 1, 7월부터 12월은 2
    if (month >= 1 && month <= 6) {
        half = 1;
    } else {
        half = 2;
    }

    return year + '-' + half; // "년도-반기" 형식의 문자열 반환
}

exports.getMyGradesPage = async (req, res, next) => {
    let userName = "";
    const date = req.params.date || getYearAndHalf();
    const scoreFilter = req.params.scoreFilter || "scoreFilter-all";
    const scoreSort = req.params.scoreSort || "scoreSort-non";
    const scoreOrder = req.params.scoreOrder || "scoreOrder-non";
    const graduatedFilter = req.params.graduatedFilter || "graduatedFilter-all";
    const graduatedSort = req.params.graduatedSort || "graduatedSort-non";
    const graduatedOrder = req.params.graduatedOrder || "graduatedOrder-non";
    const dateScores = await subjectsModel.filterAndSortScores(req.user, date, scoreFilter, scoreSort, scoreOrder);
    const graduatedList = await subjectsModel.sortGraduated(req.user, graduatedFilter, graduatedSort, graduatedOrder);
    const avgScore = await subjectsModel.avgScore(req.user);
    const semesterAvgScore = await subjectsModel.semesterAvgScore(req.user, date) || 0;
    const listenSubjectCount = await subjectsModel.listenSubject(req.user);
    const GraduatedTargetAverageGrade = await usersModel.getUserGraduatedTargetAverageGrade(req.user);
    

    try {
        userName = await usersController.getUserName(req.user);
    } catch (error) {
        console.error(error);
        return next(createError(500, "Server Error"));
    }
    res.render('myGrades', {
        scores: dateScores,
        graduatedList: graduatedList,
        userName: userName,
        date: date,
        scoreFilter: scoreFilter,
        scoreSort: scoreSort,
        scoreOrder: scoreOrder,
        graduatedFilter: graduatedFilter,
        graduatedSort: graduatedSort,
        graduatedOrder: graduatedOrder,
        avgScore: avgScore,
        semesterAvgScore: semesterAvgScore,
        listenSubjectCount: listenSubjectCount,
        GraduatedTargetAverageGrade: GraduatedTargetAverageGrade
    }); 
};

exports.getAddSubjectPage = async (req, res, next) => {
    const date = req.params.date || getYearAndHalf();

    res.render('addSubject', {
        user: req.user,
        date: date
    });
};

exports.getEditSubjectPage = async (req, res, next) => {
    const date = req.params.date || getYearAndHalf();
    const subjectCode = req.params.subjectCode;
    const scoreFilter = req.params.scoreFilter || "scoreFilter-all";
    const scoreSort = req.params.scoreSort || "scoreSort-non";
    const scoreOrder = req.params.scoreOrder || "scoreOrder-non";

    res.render('editSubject', {
        user: req.user,
        date: date,
        subjectCode: subjectCode,
        scoreFilter: scoreFilter,
        scoreSort: scoreSort,
        scoreOrder: scoreOrder
    });
}

exports.getMyFriendsPage = async (req, res, next) => {
    const articles = [];
    for (let i = 1; i <= 18; i++) {
        articles.push({ content: '내용 ' + i });
    }

    res.render('myFriends', { articles: articles }); 
};

exports.getLogInPage = async (req, res, next) => {
    res.render('logIn');
};

exports.getSignUpPage = async (req, res, next) => {
    res.render('signUp');
};

exports.getAccountSettingsPage = async (req, res, next) => {
    res.render("accountSettings");
};