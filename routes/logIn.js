const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('logIn'); // 'logIn.ejs' 파일과 데이터를 전달
});

module.exports = router;
