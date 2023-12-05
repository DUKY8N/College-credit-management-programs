const { poolPromise } = require("./index");

exports.addFriend = async function (id) {
  const pool = await poolPromise;
  await pool.query`SELECT name FROM Student WHERE student_id = ${id}`;
};


exports.compareScore = async function (id) {
  const pool = await poolPromise;
  await pool.query`SELECT name, academic_credit, subject_name, grade FROM Student JOIN Score ON Student.student_id = Score.student_id WHERE student_id = ${id}`;
};