const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const articles = [];
    for (let i = 1; i <= 18; i++) {
        articles.push({ content: '내용 ' + i });
    }

    res.render('myGrades', { articles: articles }); // 'myGrades.ejs' 파일과 데이터를 전달
});

module.exports = router;
