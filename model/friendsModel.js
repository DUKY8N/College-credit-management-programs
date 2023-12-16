const { poolPromise } = require("./index");

//친구목록
exports.getMyFriendsList = async function (id) {
  const pool = await poolPromise;
  const { recordset } = await pool.query`
    SELECT friend_student_id, Student.name
    FROM Friend
    LEFT JOIN Student
    ON Friend.friend_student_id = Student.student_id
    WHERE Friend.student_id = ${id}
  `;
  return recordset;
};

//친구등록
exports.addFriend = async function (id,friend_id) {
  const pool = await poolPromise;
  const {recordset} = 
  await pool.query`INSERT INTO Friend (student_id,friend_student_id) VALUES(${id},${friend_id})`;
  return recordset
};

//성적 비교
exports.compareScore = async function (id, friend_id, sort, order) {
  const pool = await poolPromise;
  let query = `SELECT COALESCE(userStudent.subject_code, friendStudent.subject_code) AS subject_code,
                      COALESCE(userStudent.subject_name, friendStudent.subject_name) AS subject_name,
                      userStudent.grade AS userStudentGrade, 
                      friendStudent.grade AS friendStudentGrade
                      FROM (SELECT * FROM Score WHERE student_id = ${id}) AS userStudent
                    FULL OUTER JOIN (SELECT * FROM Score WHERE student_id = ${friend_id}) AS friendStudent
                    ON userStudent.subject_code = friendStudent.subject_code`;

 switch(sort) {
   case 'userStudentGrade':
     query += `
     WHERE userStudent.student_id = ${id} 
     ORDER BY userStudentGrade`;
     break;
   case 'friendStudentGrade':
     query += `
     WHERE friendStudent.student_id = ${friend_id} 
     ORDER BY friendStudentGrade`;
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
      query += `
      WHERE userStudent.student_id = ${id}
      ORDER BY userStudentGrade`; 
 }
 switch(order) {
  case 'desc':
    query += ` DESC`;
    break;
  case 'asc':
    query += ` ASC`;
    break;
  default:
    query += ` ASC`;
 }
 
 const { recordset } = await pool.query(query);
 return recordset;
};


//친구삭제
exports.deleteFriend = async function (id, friend_id) {
  const pool = await poolPromise;
  const {recordset} = 
  await pool.query`DELETE FROM Friend WHERE (student_id = ${id} AND friend_student_id = ${friend_id});`;
  return recordset;
};

//친구성적통합정렬(내기준, 친구기준, 오름차순, 내림차순)
//내성적 기준으로 정렬시키는 조건문, 친구 기준으로 정렬되는 기준
// exports.orderAndSortScore = async function (id, friend_id, sort, order){
//   const pool = await poolPromise;
//   let query =  'SELECT subject_code, subject_name, student_grade, friendstudent_grade FROM (SELECT * FROM Score  WHERE student_id = ${id}) AS userStudent FULL OUTHER JOIN (SELECT * FROM Score WHERE student_id = ${friend_id}) AS friendStudent ON userStudent.subject_code = friendStudent.suject_code';

//   switch(sort) {
//     case 'userStudentGrade':
//       query += 'WHERE student_id = ${id} ORDER BY userStudentGrade';
//       break;
//     case 'friendStudentGrade':
//       query += 'WHERE student_id = ${friend_id} ORDER BY userStudentGrade';
//       break;
//   }

//   if (order === 'desc') {
//     query += ` DESC`;
//   } else {
//     query += ` ASC`;
//   }

//   const { recordset } = await pool.query(query);
//   return recordset;
// };