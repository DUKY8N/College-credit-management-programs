async function accountSet() {
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        const response = await fetch('http://localhost:3000/api/users/modifyUserInfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            //이름과 비밀번호를 json 형식으로 변환하여 전송
            body: JSON.stringify({
                username,
                password,
                confirmPassword
            }),
          });
        //응답이 성공적이지 않으면 오류 메시지 표시
        if (!response.ok) {
            const errorData = await response;
            return alert(errorData.message || '수정에 실패했습니다.');
        }
          //로그인 성공 시 페이지 이동
          window.location.href = '/'; 
          //에러처리
        } catch (error) {
          alert(error.message);
        }
}