const createError = require("http-errors");

exports.getMyGradesPage = async (req, res, next) => {
    const articles = [];
    for (let i = 1; i <= 18; i++) {
        articles.push({ content: '내용 ' + i });
    }

    res.render('myGrades', { articles: articles }); 
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