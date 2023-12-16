document.addEventListener('DOMContentLoaded', (event) => {
    date = document.body.dataset.date;

    displayConvertedGrade();
    displaySubjectInfo();
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

async function displaySubjectInfo() {
    try {
        const response = await fetch(`http://localhost:3000/api/subjects/getSubjectInfo/${subjectCode}/${date}`);
        let subjectInfo = await response.json();
        subjectInfo = subjectInfo.subjectInfo;
        document.getElementById('subject_code').value = subjectInfo.subject_code;
        document.getElementById('subject_name').value = subjectInfo.subject_name;
        document.getElementById('academic_credit').value = subjectInfo.academic_credit;
        document.getElementById('grade').value = subjectInfo.grade || "";
    } catch (error) {
        alert(error.message);
    }
}

async function editScore() {
    let new_subjectCode = document.getElementById('subject_code').value;
    let new_subjectName = document.getElementById('subject_name').value;
    let new_academicCredit = document.getElementById('academic_credit').value;
    let new_grade = document.getElementById('grade').value || null;

    if (new_subjectCode === '' || new_subjectName === '' || new_academicCredit === '') {
        alert('빈 칸을 모두 채워주세요.');
        return;
    }

    if ( !(0.0 <= new_grade && new_grade <= 4.5) && new_grade !== null ) {
        alert('올바른 평점을 입력해주세요.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/subjects/editSubject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject_code: subjectCode,
                date: date,
                new_subject_code: new_subjectCode,
                new_academic_credit: new_academicCredit,
                new_subject_name: new_subjectName,
                new_grade: new_grade
            }),
        });
        //응답이 성공적이지 않으면 오류 메시지 표시
        if (!response.ok) {
            const errorData = await response.json();
            return alert(errorData.message || '과목 추가에 실패했습니다.');
        }
        //과목 추가 성공 시 페이지 이동
        window.location.href = `/myGrades/${date}`; 
    //에러처리
    } catch (error) {
        alert(error.message);
    }
}