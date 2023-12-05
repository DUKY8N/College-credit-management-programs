const { name } = require("ejs");
const { poolPromise } = require("./index");

exports.addNewUser = async function (userInfo) {
  const { id, hashedPassword, username } = userInfo;
  const pool = await poolPromise;
  await pool.query`INSERT INTO Student(student_id, password, name) VALUES
                      (${id}, ${hashedPassword}, ${username});`;
};

exports.getUserById = async function (id) {
  const pool = await poolPromise;
  const { recordset } =
    await pool.query`SELECT * FROM Student WHERE student_id = ${id}`;
  return recordset;
};

exports.checkIdDuplication = async function (id) {
  const pool = await poolPromise;
  const { recordset } =
    await pool.query`SELECT student_id FROM Student WHERE student_id = ${id}`;

  if (recordset.length > 0) return true;
  return false;
};

exports.changePassword = async function (id, newPassword) {
  const pool = await poolPromise;
  await pool.query`UPDATE Student SET password = ${newPassword} WHERE student_id = ${id}`;
};

exports.changeName = async function (id, newName) {
  const pool = await poolPromise;
  await pool.query`UPDATE Student SET name = ${newName} WHERE student_id = ${id}`;
}


exports.addFriend = async function (id) {
  const pool = await poolPromise;
  await pool.query`SELECT name FROM Student WHERE student_id = ${id}`;
};


exports.compareScore = async function (id) {
  const pool = await poolPromise;
  await pool.query`SELECT name, academic_credit, subject_name, grade FROM Student JOIN Score ON Student.student_id = Score.student_id WHERE student_id = ${id}`;
};


// TODO: 회원 탈퇴 기능 구현
