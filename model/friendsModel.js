const { poolPromise } = require("./index");

exports.addFriend = async function (id,f_id) {
  const pool = await poolPromise;
  await pool.query`INSERT INTO Friend VALUES (student_id = ${id},friend_student_id = ${f_id})`;
};


exports.compareScore = async function (id,f_id) {
  const pool = await poolPromise;
  await pool.query`SELECT  StudentScore.subject_name AS subject_name, StudentScore.grade AS student_grade, FriendScore.grade AS friend_grade FROM Friend LEFT JOIN Score AS StudentScore ON Friend.student_id = StudentScore.student_id 
  LEFT JOIN Score AS FriendScore ON Friend.friend_student_id = FriendScore.student_id
  WHERE 
    (Friend.student_id = ${id} AND Friend.friend_student_id = ${f_id} );`;
};


exports.deleteFriend = async function (id,f_id) {
  const pool = await poolPromise;
  await pool.query`DELETE FROM Friend WHERE (student_id = ${id} AND friend_student_id = ${f_id});`;
};