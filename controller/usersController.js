const passport = require("passport");
const createError = require("http-errors");
const usersModel = require("../model/usersModel");
const bcrypt = require("bcrypt");

exports.signUp = async function (req, res, next) {
    try {
      // 필수 입력 필드 검사
      const { id, password, checkedPassword, username } = req.body;
      if (!id || !password || !checkedPassword || !username) {
        console.log(id, password, checkedPassword, username);
        return next(createError(400, "Missing required fields"));
      }
  
      // ID 중복 검사
      if (await usersModel.checkIdDuplication(id)) {
        return next(createError(409, "ID already exists"));
      }
  
      // 비밀번호 일치성 검사
      if (password !== checkedPassword) {
        return next(createError(422, "Passwords do not match"));
      }
  
      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 12); // 비밀번호 해싱 (비동기 함수)

      // 새 사용자 추가
      await usersModel.addNewUser({ id, hashedPassword, username });
      return res.status(201).json({ message: "Successfully signed up!" });
    } catch (error) {
      next(error);
    }
  };


exports.idCheck = async function (req, res, next) {
    try {
        if (req.body.id === undefined) return next(createError(400, "Missing required fields"));
        if (await usersModel.checkIdDuplication(req.body.id)) return res.status(409).json({ message: "ID already exists" });

        return res.status(200).json({ message: "This ID is valid. ID available" });
    } catch (error) {
        next(error);
    }
}

//로그인 
exports.logIn = function (req, res, next) {
  //username과 password 누락 확인
  if (!req.body.username || !req.body.password) {
    return next(createError(400, "Missing required fields"));
  }
  //passport로 로그인 시도
  passport.authenticate("local", function (err, user, userError) {
    //에러
    if (err) {
      console.error(err);
      return next(createError(500, "login_error"));
    }

    if (!user) {
      return next(userError);
    }

    return req.login(user, (err) => {
      if (err) {
        console.error(err);
        return next(createError(500, "login_error"));
      }
      //인증성공시 상태코드 및 메시지 전송
      res.status(201).json({ message: "Login successful!" });
    });
  })(req, res, next);
};
//로그아웃
exports.logOut = function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(createError(500, "logout_error"));
    }
    return res.status(201).json({ message: "Logout successful!" });
  });
};