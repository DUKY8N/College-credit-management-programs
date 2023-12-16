const createError = require("http-errors");
const friendsModel = require("../model/friendsModel");
const usersModel = require("../model/usersModel");
const bcrypt = require("bcrypt");


//친구 목록
exports.getMyFriendsList = async function (req,res,next) {
  try{
    const result = await friendsModel.getMyFriendsList(req.user);

    if (result) {
      res.status(200).json({ success: true, result });
    } else {
      res.status(404).json({ success: false, message: 'Student scores not found' });
    }
  } catch (error) {
    next(error);
  }
};

//친구 추가
exports.addFriend = async function (req,res,next) {
  try{
    const { friend_id } = req.body;
    const id = req.user;
    const friendsList = await friendsModel.getMyFriendsList(req.user);

    if(!id || !friend_id){
      return next(createError(400, "Missing required fields"));
    }

    //자기 자신을 친구로 등록하려는지
    if (id == friend_id) {
      return res.status(409).json({ message: "Can't add yourself!" });
    }

    //친구가 있는지,
    for (let i = 0; i < friendsList.length; i++) {
      if (friendsList[i].friend_student_id == friend_id) {
        return res.status(409).json({ message: "Already exist Friend!" });
      }
    }

    //등록하려는 유저가 실제로 존재하는지
    if (!await usersModel.checkIdDuplication(friend_id)) {
      return res.status(404).json({ message: "Not found Friend!" });
    }

    await friendsModel.addFriend(id, friend_id);
    return res.status(201).json({ message: "Add Friend!" });
  }catch (error) {
    next(error);
  }
};

//친구 삭제
exports.deleteFriend = async function (req,res,next) {
  try{
    //필수 입력 필드 검사
    const { friend_id } = req.body;
    const id = req.user;
    if(!friend_id){
      return next(createError(400, "Missing required fields"));
    }

    await friendsModel.deleteFriend(id, friend_id);
    return res.status(200).json({ message: "Delete Friend!" });
  }catch (error) {
    next(error);
  }
};
//성적비교
exports.compareScore = async function (req, res, next) {
  try{
    const {id, friend_id, sort, order} = req.body;
    const result = await friendsModel.compareScore(id, friend_id, sort, order);
    
    if (result && result.length > 0) {
      res.status(200).json({ success: true, result });
    } else {
      res.status(404).json({ success: false, message: 'Student scores not found' });
    }
  } catch (error) {
    next(error);
  }
};

// exports.orderAndSortScores = async function (req, res, next) {
//   try {
//     const { id, friend_id, sort, order } = req.body;
//     const result = await friendsModel.orderAndSortScores(req.user, id, friend_id, sort, order);

//     if (scores && scores.length > 0) {
//       res.status(200).json({ success: true, result });
//     } else {
//       res.status(404).json({ success: false, message: 'No scores found' });
//     }
//   } catch (error) {
//     next(error);
//   }
// };


//내기준 친구 성적 비교, 친구기준 성적 비교
      
    /*if(!id || !friend_id){
      return next(createError(400, "Missing required fields"));
    }

    //친구 성적 비교, 친구가 있는지, 
    if(friend_id.length > 0){
      return res.status(200).json({ message: "Found Friend!" });
    } else{
      return res.status(404).json({ message: "Not found Friend!" });
    }

    await friendsModel.compareScore(friend_id);
    return res.status(200).json({ message: "Compare Score!" });
  }catch (error) {
    next(error);
  }
};*/