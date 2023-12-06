const { poolPromise } = require("./index");


//성적등록
exports.addScore = async function (userScore) {
    const { subject_code, academic_credit, subject_name, grade, student_id, date } = userScore;
    const pool = await poolPromise;
    await pool.query`INSERT INTO Score
                        VALUES (${subject_code}, ${subject_name}, ${academic_credit}, ${grade}, ${date}, ${student_id});`;       
};

//성적수정
exports.changeScore = async function (newGrade, subject_code, student_id) {
    const pool = await poolPromise;
    await pool.query`UPDATE Score SET grade = ${newGrade} WHERE subject_code = ${subject_code} AND student_id = ${student_id};`;
};

//평균학점
exports.avgScore = async function (id) {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT ROUND(SUM(academic_credit * grade) / SUM(academic_credit), 2) AS averageScore FROM Score WHERE student_id = ${id};`;
      console.log('Model recordset:', recordset);
    return recordset;
};

//졸업요건비교
exports.Graduated = async function (id) {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT COALESCE(score.subject_code, graduated.subject_code) AS subject_code,
                              COALESCE(score.subject_name, graduated.subject_name) AS subject_name,
                              score.academic_credit,
                              score.grade
                       FROM Score 
                       INNER JOIN graduated ON score.subject_code = graduated.subject_code
                       WHERE student_id = ${id}`;
    return recordset.length > 0 ? recordset : null;
};

//학기별 성적보기
exports.dateScore = async function (date, id) {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT subject_code, subject_name, academic_credit, grade FROM Score WHERE date = ${date} AND student_id = ${id}`;
    return recordset;
};

//성적정렬(오름차순)
exports.sortScoreAsc = async function () {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT subject_code, subject_name, academic_credit, grade FROM Score ORDER BY grade;`;
    return recordset;
};

//성적정렬(내림차순)
exports.sortScoreDesc = async function () {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT subject_code, subject_name, academic_credit, grade FROM Score ORDER BY grade DESC;`;
    return recordset;
};

//들은과목수확인(보류)
//? 과연 이게 필요할까요?
exports.listenSubject = async function () {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT COUNT(*) as student_id FROM Score GROUP BY student_id;`;
    return recordset;
};