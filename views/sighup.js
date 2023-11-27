function goBack() {
    window.history.back();
}

function validateForm() {
    var student_id = document.getElementById('student_id').value;
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // 학번은 숫자만 입력 가능
    if (!/^\d+$/.test(student_id)) {
        alert("학번은 숫자만 입력 가능합니다.");
        return false;
    }

    // 아이디는 6~14자
    if (id.length < 6 || id.length > 14) {
        alert("아이디는 6~14자여야 합니다.");
        return false;
    }


    return true;
}

function checkid() {
    var id = document.getElementById('id').value;


    if (id === 'existing_id') {
        document.getElementById('idError').innerText = '이미 사용 중인 아이디입니다.';
    } else {
        document.getElementById('idError').innerText = '';
        alert('사용 가능한 아이디입니다.');
    }
}