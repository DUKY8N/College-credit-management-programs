const createError = require("http-errors");
const friendsModel = require("../model/friendsModel");
const bcrypt = require("bcrypt");

//친구 추가
exports.addFriend = async function (req,res,next) {
  try{
    //필수 입력 필드 검사
    const { id, username, friend_id } = req.body;
    console.log(id)
    console.log(username)
    if(!id || !friend_id){
      console.log(id);
      return next(createError(400, "Missing required fields"));
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
    const {id, friend_id} = req.body;
    console.log(id, friend_id)
    if(!friend_id){
      console.log(friend_id);
      return next(createError(400, "Missing required fields"));
    }

    await friendsModel.deleteFriend(friend_id);
    return res.status(200).json({ message: "Delete Friend!" });
  }catch (error) {
    next(error);
  }
};
//성적비교
exports.compareScore = async function (req,res,next) {
  try{
    //필수 입력 필드 검사
    const {id,friend_id} = req.body;
    const result = await friendsModel.compareScore(req.subject_name, student_id, friendstudent_id);
    
    if (result && result.length > 0) {
      res.status(200).json({ success: true, result });
    } else {
      res.status(404).json({ success: false, message: 'Student scores not found' });
    }
  } catch (error) {
    next(error);
  }
};


//내기준 친구 성적 비교, 친구기준 성적 비교
      
    /*if(!id || !friend_id){
      console.log(id, friend_id);
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