const createError = require("http-errors");
const friendsModel = require("../model/friendsModel");
const bcrypt = require("bcrypt");


exports.addFriend = async function (req,res,next) {
  try{
    //필수 입력 필드 검사
    const {id} = req.body;
    if(!id){
      console.log(id);
      return next(createError(400, "Missing required fields"));
    }

    //친구 추가
    await friendsModel.addFriend({id});
    return res.status(201).json({ message: "Add Friend!" });
  }catch (error) {
    next(error);
  }
};

exports.deleteFriend = async function (req,res,next) {
  try{
    //필수 입력 필드 검사
    const {f_id} = req.body;
    if(!f_id){
      console.log(f_id);
      return next(createError(400, "Missing required fields"));
    }

    //친구 삭제
    await friendsModel.deleteFriend({f_id});
    return res.status(200).json({ message: "Delete Friend!" });
  }catch (error) {
    next(error);
  }
};

exports.compareScore = async function (req,res,next) {
  try{
    //필수 입력 필드 검사
    const {id,f_id} = req.body;
    if(!id || !f_id){
      console.log(id, f_id);
      return next(createError(400, "Missing required fields"));
    }

    //친구 성적 비교, 친구가 있는지, 

    if(f_id.length > 0){
      return res.status(200).json({ message: "Found Friend!" });
    } else{
      return res.status(404).json({ message: "Not found Friend!" });
    }

    await friendsModel.compareScore({f_id});
    return res.status(200).json({ message: "!" });
  }catch (error) {
    next(error);
  }
};