function addFriend() {
    let friend_id = prompt("친구의 학번을 입력해주세요.");
    if (friend_id === null || friend_id === '') return; 
    
    fetch('http://localhost:3000/api/friends/addFriend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            friend_id: friend_id,
        }),
    }).then((response) => {
        if (!response.ok) {
            return alert('친구 추가에 실패했습니다.');
        }
        window.location.href = `/myFriends`; 
    });
}

function deleteFriend(friend_id) {
    if (confirm('정말로 삭제하시겠습니까?')) {
        fetch('http://localhost:3000/api/friends/deleteFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                friend_id: friend_id,
            }),
        }).then((response) => {
            if (!response.ok) {
                return alert('친구 삭제에 실패했습니다.');
            }
            window.location.href = `/myFriends`; 
        });
        window.location.href = `/myFriends`; 
    }
}