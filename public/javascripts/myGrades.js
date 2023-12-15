let date;
let filter;
let sort;
let order;

document.addEventListener('DOMContentLoaded', (event) => {
    date = document.body.dataset.date;
    filter = document.body.dataset.filter;
    sort = document.body.dataset.sort;
    order = document.body.dataset.order;
    document.getElementById('date').innerText = convertToGradeFormat(date);
    displayFilter();
    displaySortAndOrder();
    displayGradeFloatToText();
});

function convertToGradeFormat(str) {
    let parts = str.split('-'); // 문자열을 '-' 기준으로 분리
    let year = parts[0]; // 첫 번째 부분은 년도
    let semester = parts[1]; // 두 번째 부분은 학기

    return year + '년도 ' + semester + '학기 ';
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

    window.location.href = `/myGrades/${year + '-' + semester}/${filter}/${sort}/${order}`;
}

function navigateCurrentDate() {
    window.location.href = `/myGrades`;
}

function navigateFilter() {
    if (filter === 'filter-all') window.location.href = `/myGrades/${date}/major/${sort}/${order}`;
    if (filter === 'major') window.location.href = `/myGrades/${date}/notmajor/${sort}/${order}`;
    if (filter === 'notmajor') window.location.href = `/myGrades/${date}/filter-all/${sort}/${order}`;
}

function displayFilter() {
    if (filter === 'filter-all')document.getElementById('filter').innerText = "전체 성적";
    if (filter === 'major')document.getElementById('filter').innerText = "전공 성적";
    if (filter === 'notmajor')document.getElementById('filter').innerText = "교양 성적";
}

function navigateSortAndOrder(clickedSort) {
    if (clickedSort !== sort) { window.location.href = `/myGrades/${date}/${filter}/${clickedSort}/asc`; return; }

    if (order === 'asc') window.location.href = `/myGrades/${date}/${filter}/${sort}/desc`;
    if (order === 'desc') window.location.href = `/myGrades/${date}/${filter}/sort-non/order-non`;
}

function displaySortAndOrder() {
    if (order === 'asc') document.getElementById(sort).innerText = document.getElementById(sort).innerText + "▲";
    if (order === 'desc') document.getElementById(sort).innerText = document.getElementById(sort).innerText + "▼";
}

function displayGradeFloatToText() {
    let grades = document.getElementsByClassName('grade');
    console.log(grades);
    console.log(grades.length);
    for (let i = 0; i < grades.length; i++) {
        console.log(grades[i].innerText);
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