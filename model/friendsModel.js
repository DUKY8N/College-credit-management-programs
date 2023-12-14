const { poolPromise } = require("./index");

exports.addFriend = async function (id,friend_id) {
  const pool = await poolPromise;
  const {recordset} = 
  await pool.query`INSERT INTO Friend (student_id,friend_student_id) VALUES(${id},${friend_id})`;
  return recordset
};


exports.compareScore = async function (id,friend_id) {
  const pool = await poolPromise;
  const { recordset } = 
  await pool.query`SELECT COALESCE(userStudent.subject_code, friendStudent.subject_code) AS subject_code,
  COALESCE(userStudent.subject_name, friendStudent.subject_name) AS subject_name,
   userStudent.grade AS userStudentGrade, 
   friendStudent.grade AS friendStudentGrade
FROM (SELECT * FROM Score WHERE student_id = ${id} ) AS userStudent
FULL OUTER JOIN (SELECT * FROM Score WHERE student_id = ${friend_id}) AS friendStudent
ON userStudent.subject_code = friendStudent.subject_code;`;
return recordset;
};

exports.mycompareScore = async function (id,friend_id) {
  const pool = await poolPromise;
  const { recordset } = 
  await pool.query`SELECT 
  COALESCE(userStudent.subject_code, friendStudent.subject_code) AS subject_code,
  COALESCE(userStudent.subject_name, friendStudent.subject_name) AS subject_name,
  userStudent.grade AS userStudentGrade, 
  friendStudent.grade AS friendStudentGrade
FROM 
  (SELECT subject_code, subject_name, grade FROM Score WHERE student_id = ${id}) AS userStudent
LEFT OUTER JOIN 
  (SELECT subject_code, subject_name, grade FROM Score WHERE student_id = ${friend_id}) AS friendStudent
ON 
  userStudent.subject_code = friendStudent.subject_code;`;
return recordset;
};

exports.friendcompareScore = async function (id,friend_id) {
  const pool = await poolPromise;
  const { recordset } = 
  await pool.query`SELECT 
  COALESCE(userStudent.subject_code, friendStudent.subject_code) AS subject_code,
  COALESCE(userStudent.subject_name, friendStudent.subject_name) AS subject_name,
  userStudent.grade AS userStudentGrade, 
  friendStudent.grade AS friendStudentGrade
FROM 
  (SELECT subject_code, subject_name, grade FROM Score WHERE student_id = ${friend_id}) AS friendStudent
RIGHT OUTER JOIN 
  (SELECT subject_code, subject_name, grade FROM Score WHERE student_id = ${id}) AS userStudent
ON 
  userStudent.subject_code = friendStudent.subject_code;`;
return recordset;
};



exports.deleteFriend = async function (id,friend_id) {
  const pool = await poolPromise;
  const {recordset} = 
  await pool.query`DELETE FROM Friend WHERE (student_id = ${id} AND friend_student_id = ${friend_id});`;
  return recordset;
};