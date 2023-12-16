document.addEventListener('DOMContentLoaded', (event) => {
    date = document.body.dataset.date;

    displayConvertedGrade();

});

function convertToGradeFormat(str) {
    let parts = str.split('-'); // 문자열을 '-' 기준으로 분리
    let year = parts[0]; // 첫 번째 부분은 년도
    let semester = parts[1]; // 두 번째 부분은 학기

    return year + '년도 ' + semester + '학기 ';
}

function displayConvertedGrade() {
    let elements = document.getElementsByClassName('date');
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = convertToGradeFormat(date);
    }
}

async function addScore() {
    let subjectCode = document.getElementById('subject_code').value;
    let subjectName = document.getElementById('subject_name').value;
    let academicCredit = document.getElementById('academic_credit').value;
    let grade = document.getElementById('grade').value || null;

    if (subjectCode === '' || subjectName === '' || academicCredit === '') {
        alert('빈 칸을 모두 채워주세요.');
        return;
    }

    if ( !(0.0 <= grade && grade <= 4.5) && grade !== null ) {
        alert('올바른 평점을 입력해주세요.');
        return;
    }

    console.log(subjectCode, subjectName, academicCredit, grade, date, studentId);
    try {
        const response = await fetch('http://localhost:3000/api/subjects/addScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject_code: subjectCode,
                academic_credit: academicCredit,
                subject_name: subjectName,
                grade: grade,
                date: date,
                student_id: studentId,
            }),
        });
        //응답이 성공적이지 않으면 오류 메시지 표시
        if (!response.ok) {
            const errorData = await response;
            return alert(errorData.message || '과목 추가에 실패했습니다.');
        }
        //과목 추가 성공 시 페이지 이동
        window.location.href = `/myGrades/${date}`; 
    //에러처리
    } catch (error) {
        alert(error.message);
    }
}