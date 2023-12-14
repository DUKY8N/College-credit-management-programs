let date;
let formattedDate;

document.addEventListener('DOMContentLoaded', (event) => {
    date = document.body.dataset.date;
    formattedDate = convertToGradeFormat(date);
    document.getElementById('date').innerText = formattedDate;
    document.getElementById('filter').innerText = "전체 성적";
});

function convertToGradeFormat(str) {
    let parts = str.split('-'); // 문자열을 '-' 기준으로 분리
    let year = parts[0]; // 첫 번째 부분은 년도
    let semester = parts[1]; // 두 번째 부분은 학기

    return year + '년도 ' + semester + '학기 ';
}

function navigateDate(direction) {
    console.log(direction);
    console.log(date);

    let parts = date.split('-');
    let year = parseInt(parts[0]);
    let semester = parseInt(parts[1]);

    if (direction === 'next') {
        if (semester === 1) {
            semester = 2;
        } else {
            year += 1;
            semester = 1;
        }
    } else if (direction === 'previous') {
        if (semester === 2) {
            semester = 1;
        } else {
            year -= 1;
            semester = 2;
        }
    }

    window.location.href = `/myGrades/${year + '-' + semester}`
}

function navigateCurrentDate() {
    window.location.href = `/myGrades`;
}