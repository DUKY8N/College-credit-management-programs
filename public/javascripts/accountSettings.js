document.getElementById('student_id').value = userInfo.student_id;
document.getElementById('name').value = userInfo.name;

function goBack() {
    window.history.back();
}

function updateInfo() {
    var password = document.getElementById('password').value;
    alert('정보가 수정되었습니다.');
    return false;
}