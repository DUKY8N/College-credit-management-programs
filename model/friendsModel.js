const { poolPromise } = require("./index");

exports.addFriend = async function (id,f_id) {
  const pool = await poolPromise;
  await pool.query`INSERT INTO Friend VALUES (student_id = ${id},friend_student_id = ${f_id})`;
};


exports.compareScore = async function (id) {
  const pool = await poolPromise;
  await pool.query`SELECT f.student_id AS student_id, s.name AS student_name, f.friend_student_id AS friend_id,fs.name AS friend_name,sc.subject_code,sc.academic_credit,sc.subject_name,sc.grade FROM Friend f JOIN Student s ON f.student_id = s.student_id JOIN Student fs ON f.friend_student_id = fs.student_id JOIN Score sc ON f.student_id = sc.student_id OR f.friend_student_id = sc.student_id
  WHERE f.student_id = ${id}`;
};


exports.deleteFriend = async function (id,f_id) {
  const pool = await poolPromise;
  await pool.query`DELETE FROM Friend WHERE (student_id = ${id} AND friend_student_id = ${f_id});`;
};