const { poolPromise } = require("./index");


//성적등록
exports.addScore = async function (userScore) {
    const { subject_code, academic_credit, subject_name, grade, date, student_id, target_grade } = userScore;
    const pool = await poolPromise;
    await pool.query`INSERT INTO Score
                        VALUES (${subject_code}, ${subject_name}, ${academic_credit}, ${grade}, ${date}, ${student_id}, ${target_grade});`;       
};

//성적수정
exports.changeScore = async function (newGrade, subject_code, id) {
    const pool = await poolPromise;
    await pool.query`UPDATE Score SET grade = ${newGrade} WHERE subject_code = ${subject_code} AND student_id = ${id};`;
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
    const { recordset } = await pool.query` SELECT Score.subject_code
                                            FROM Score
                                            INNER JOIN graduated ON Score.subject_code = graduated.subject_code
                                            WHERE Score.student_id = ${id};`;
    return recordset;
};

//학기별 성적보기
exports.dateScore = async function (date, id) {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT subject_code, subject_name, academic_credit, grade FROM Score WHERE date = ${date} AND student_id = ${id};`;
    return recordset;
};

//들은과목수확인
exports.listenSubject = async function (id) {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT COUNT(*) as listen_Subject FROM Score WHERE student_id = ${id} GROUP BY student_id;`;
    return recordset;
};

//통합정렬
exports.filterAndSortScores = async function (id, filter, sort, order) {
  const pool = await poolPromise;
  let query = `SELECT subject_code, subject_name, academic_credit, grade FROM Score WHERE student_id = ${id}`;

  if (filter === 'major') {
    query += ` AND subject_code LIKE ('%COM%')`;
  } else if (filter === 'notmajor') {
    query += ` AND subject_code NOT LIKE ('%COM%')`;
  }

  switch(sort) {
    case 'grade':
      query += ` ORDER BY grade`;
      break;
    case 'subject_name':
      query += ` ORDER BY subject_name`;
      break;
    case 'subject_code':
      query += ` ORDER BY subject_code`;
      break;
    case 'academic_credit':
      query += ` ORDER BY academic_credit`;
      break;
    default:
      query += ` ORDER BY grade`;
  }

  if (order === 'desc') {
    query += ` DESC`;
  } else {
    query += ` ASC`;
  }

  const { recordset } = await pool.query(query);
  return recordset;
};

//성적 삭제
exports.deleteScore = async function (id, subject_code) {
  const pool = await poolPromise;

  const checkResult = await pool.query`SELECT COUNT(1) AS count FROM Score WHERE student_id = ${id} AND subject_code = ${subject_code}`;
  const count = checkResult.recordset[0].count;

  if (count === 0) {
    return false;
  }

  await pool.query`DELETE FROM Score WHERE student_id = ${id} AND subject_code = ${subject_code}`;
  return true;
};