const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const articles = [
        { content: '내용 1' },
        { content: '내용 2' },
        { content: '내용 3' },
        { content: '내용 4' },
        { content: '내용 5' },
        { content: '내용 6' },
        { content: '내용 7' },
        { content: '내용 8' },
        // 여기에 더 많은 article 데이터를 추가할 수 있다.
    ];

    res.render('myGrades', { articles: articles }); // 'myGrades.ejs' 파일과 데이터를 전달
});

module.exports = router;
