document.addEventListener('DOMContentLoaded', (event) => {
    displayFilter();
    displaySortAndOrder();
    displayGradeFloatToText();
});

function navigateFilter() {
    if (filter === 'filter-all') window.location.href = `/compareGrades/${friendsId}/my_subject/${sort}/${order}`;
    if (filter === 'my_subject') window.location.href = `/compareGrades/${friendsId}/friend_subject/${sort}/${order}`;
    if (filter === 'friend_subject') window.location.href = `/compareGrades/${friendsId}/filter-all/${sort}/${order}`;
}

function displayFilter() {
    if (filter === 'filter-all') document.getElementById('filter').innerText = "전체 과목 비교";
    if (filter === 'my_subject') document.getElementById('filter').innerText = "내 과목만 비교";
    if (filter === 'friend_subject') document.getElementById('filter').innerText = "친구 과목만 성적";
}

function navigateSortAndOrder(clickedSort) {
    if (clickedSort !== sort) { window.location.href = `/compareGrades/${friendsId}/${filter}/${clickedSort}/desc`; return; }

    if (order === 'desc') window.location.href = `/compareGrades/${friendsId}/${filter}/${sort}/asc`;
    if (order === 'asc') window.location.href = `/compareGrades/${friendsId}/${filter}/sort-non/order-non`;
}

function displaySortAndOrder() {
    if (order === 'asc') document.getElementById(sort).innerText = document.getElementById(sort).innerText + "▲";
    if (order === 'desc') document.getElementById(sort).innerText = document.getElementById(sort).innerText + "▼";
}

function displayGradeFloatToText() {
    let grades = document.getElementsByClassName('grade');
    for (let i = 0; i < grades.length; i++) {
        if (grades[i].innerText == 4.5) grades[i].innerText = 'A+';
        if (grades[i].innerText == 4.0) grades[i].innerText = 'A';
        if (grades[i].innerText == 3.5) grades[i].innerText = 'B+';
        if (grades[i].innerText == 3.0) grades[i].innerText = 'B';
        if (grades[i].innerText == 2.5) grades[i].innerText = 'C+';
        if (grades[i].innerText == 2.0) grades[i].innerText = 'C';
        if (grades[i].innerText == 1.5) grades[i].innerText = 'D+';
        if (grades[i].innerText == 1.0) grades[i].innerText = 'D';
        if (grades[i].innerText === '0') grades[i].innerText = 'F';
        if (grades[i].innerText === '') grades[i].innerText = '-';
    }
}