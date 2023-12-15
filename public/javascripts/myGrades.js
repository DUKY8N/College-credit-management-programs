let date;
let scoreFilter;
let scoreSort;
let scoreOrder;
let graduatedFilter;
let graduatedSort;
let graduatedOrder;

document.addEventListener('DOMContentLoaded', (event) => {
    date = document.body.dataset.date;
    scoreFilter = document.body.dataset.scoreFilter;
    scoreSort = document.body.dataset.scoreSort;
    scoreOrder = document.body.dataset.scoreOrder;
    graduatedFilter = document.body.dataset.graduatedFilter;
    graduatedSort = document.body.dataset.graduatedSort;
    graduatedOrder = document.body.dataset.graduatedOrder;
    displayConvertedGrade();
    displayScoreFilter();
    displayGraduatedFilter();

    displayScoreSortAndOrder();
    displayGraduatedSortAndOrder();

    displayGradeFloatToText();
    displayCompletionStatusIntToText();
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

function navigateDate(direction) {
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

    window.location.href = `/myGrades/${year + '-' + semester}/${scoreFilter}/${scoreSort}/${scoreOrder}/${graduatedFilter}/${graduatedSort}/${graduatedOrder}`;
}

function navigateCurrentDate() {
    window.location.href = `/myGrades`;
}

function navigateScoreFilter() {
    if (scoreFilter === 'scoreFilter-all') window.location.href = `/myGrades/${date}/major/${scoreSort}/${scoreOrder}/${graduatedFilter}/${graduatedSort}/${graduatedOrder}`;
    if (scoreFilter === 'major') window.location.href = `/myGrades/${date}/notmajor/${scoreSort}/${scoreOrder}/${graduatedFilter}/${graduatedSort}/${graduatedOrder}`;
    if (scoreFilter === 'notmajor') window.location.href = `/myGrades/${date}/scoreFilter-all/${scoreSort}/${scoreOrder}/${graduatedFilter}/${graduatedSort}/${graduatedOrder}`;
}

function displayScoreFilter() {
    if (scoreFilter === 'scoreFilter-all') document.getElementById('score-filter').innerText = "전체 성적";
    if (scoreFilter === 'major') document.getElementById('score-filter').innerText = "전공 성적";
    if (scoreFilter === 'notmajor') document.getElementById('score-filter').innerText = "교양 성적";
}

function navigateScoreSortAndOrder(clickedScoreSort) {
    if (clickedScoreSort !== scoreSort) { window.location.href = `/myGrades/${date}/${scoreFilter}/${clickedScoreSort}/desc/${graduatedFilter}/${graduatedSort}/${graduatedOrder}`; return; }

    if (scoreOrder === 'desc') window.location.href = `/myGrades/${date}/${scoreFilter}/${scoreSort}/asc/${graduatedFilter}/${graduatedSort}/${graduatedOrder}`;
    if (scoreOrder === 'asc') window.location.href = `/myGrades/${date}/${scoreFilter}/scoreSort-non/scoreOrder-non/${graduatedFilter}/${graduatedSort}/${graduatedOrder}`;
}

function displayScoreSortAndOrder() {
    if (scoreOrder === 'asc') document.getElementById(scoreSort).innerText = document.getElementById(scoreSort).innerText + "▲";
    if (scoreOrder === 'desc') document.getElementById(scoreSort).innerText = document.getElementById(scoreSort).innerText + "▼";
}

function displayGradeFloatToText() {
    let grades = document.getElementsByClassName('grade');
    for (let i = 0; i < grades.length; i++) {
        if (grades[i].innerText === '4.5') grades[i].innerText = 'A+';
        if (grades[i].innerText === '4.0') grades[i].innerText = 'A';
        if (grades[i].innerText === '3.5') grades[i].innerText = 'B+';
        if (grades[i].innerText === '3.0') grades[i].innerText = 'B';
        if (grades[i].innerText === '2.5') grades[i].innerText = 'C+';
        if (grades[i].innerText === '2.0') grades[i].innerText = 'C';
        if (grades[i].innerText === '1.5') grades[i].innerText = 'D+';
        if (grades[i].innerText === '1.0') grades[i].innerText = 'D';
        if (grades[i].innerText === '0') grades[i].innerText = 'F';
    }
}

function displayCompletionStatusIntToText() {
    let completionStatusList = document.getElementsByClassName('completion_status');
    for (let i = 0; i < completionStatusList.length; i++) {
        if (completionStatusList[i].innerText === '1') completionStatusList[i].innerText = 'O';
        if (completionStatusList[i].innerText === '0') completionStatusList[i].innerText = 'X';
    }
}

function navigateGraduatedFilter() {
    if (graduatedFilter === 'graduatedFilter-all') window.location.href = `/myGrades/${date}/${scoreFilter}/${scoreSort}/${scoreOrder}/major/${graduatedSort}/${graduatedOrder}`;
    if (graduatedFilter === 'major') window.location.href = `/myGrades/${date}/${scoreFilter}/${scoreSort}/${scoreOrder}/notmajor/${graduatedSort}/${graduatedOrder}`;
    if (graduatedFilter === 'notmajor') window.location.href = `/myGrades/${date}/${scoreFilter}/${scoreSort}/${scoreOrder}/graduatedFilter-all/${graduatedSort}/${graduatedOrder}`;
}

function displayGraduatedFilter() {
    if (graduatedFilter === 'graduatedFilter-all') document.getElementById('graduated-filter').innerText = "전체";
    if (graduatedFilter === 'major') document.getElementById('graduated-filter').innerText = "전공";
    if (graduatedFilter === 'notmajor') document.getElementById('graduated-filter').innerText = "교양";
}

function navigateGraduatedSortAndOrder(clickedGraduatedSort) {
    if (clickedGraduatedSort !== graduatedSort) { window.location.href = `/myGrades/${date}/${scoreFilter}/${scoreSort}/${scoreOrder}/${graduatedFilter}/${clickedGraduatedSort}/desc`; return; }

    if (graduatedOrder === 'desc') window.location.href = `/myGrades/${date}/${scoreFilter}/${scoreSort}/${scoreOrder}/${graduatedFilter}/${graduatedSort}/asc`;
    if (graduatedOrder === 'asc') window.location.href = `/myGrades/${date}/${scoreFilter}/${scoreSort}/${scoreOrder}/${graduatedFilter}/graduatedSort-non/graduatedOrder-non`;
}

function displayGraduatedSortAndOrder() {
    if (graduatedOrder === 'asc') document.getElementById("graduated_"+graduatedSort).innerText = document.getElementById("graduated_"+graduatedSort).innerText + "▲";
    if (graduatedOrder === 'desc') document.getElementById("graduated_"+graduatedSort).innerText = document.getElementById("graduated_"+graduatedSort).innerText + "▼";
}