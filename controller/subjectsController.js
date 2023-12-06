const createError = require("http-errors");
const subjectsModel = require("../model/subjectsModel");
const bcrypt = require("bcrypt");

//성적등록 컨트롤러
exports.addScore = async function (req, res, next) {
    try {
      const userScore = req.body;

      await subjectsModel.addScore(userScore);

      res.status(201).json({ success: true, message: 'Score added successfully' });
    } catch (error) {
      next(error);
    }
};

//성적수정 컨트롤러
exports.changeScore = async function (req, res, next) {
    try {
      const { subject_code, newGrade } = req.body;
  
      await subjectsModel.changeScore(subject_code, newGrade);
  
      res.status(200).json({ success: true, message: 'Score updated successfully' });
    } catch (error) {
      next(error);
    }
};

//평균학점 계산 컨트롤러
exports.avgScore = async function (req, res, next) {
  try {
    const { studentId } = req.params;

    const averageScore = await subjectsModel.avgScore(studentId);

    if (averageScore) {
      res.status(200).json({ success: true, averageScore });
    } else {
      res.status(404).json({ success: false, message: 'Average score not found' });
    }
  } catch (error) {
    next(error);
  }
};

//졸업요건비교 컨트롤러
exports.Graduated = async function (req, res, next) {
  try {
    const { studentId } = req.params;

    const graduationRequirements = await subjectsModel.Graduated(studentId);

    if (graduationRequirements !== null) {
      res.status(200).json({ success: true, graduationRequirements });
    } else {
      res.status(404).json({ success: false, message: 'Graduation requirements not found' });
    }
  } catch (error) {
    next(error);
  }
};

//학기별성적보기 컨트롤러
exports.dateScore = async function (req, res, next) {
  try {
    const { date, id } = req.params;

    const semesterScores = await subjectsModel.dateScore(date, id);

    if (semesterScores && semesterScores.length > 0) {
      res.status(200).json({ success: true, semesterScores });
    } else {
      res.status(200).json({ success: true, semesterScores: [] });
    }
  } catch (error) {
    next(error);
  }
};

//성적정렬 컨트롤러(오름차순)
exports.sortScoreAsc = async function (req, res, next) {
  try {
    const sortedScores = await subjectsModel.sortScoreAsc();

    if (sortedScores && sortedScores.length > 0) {
      res.status(200).json({ success: true, sortedScores });
    } else {
      res.status(404).json({ success: false, message: 'Sorted scores not found' });
    }
  } catch (error) {
    next(error);
  }
};

//성적정렬 컨트롤러(내림차순)
exports.sortScoreDesc = async function (req, res, next) {
  try {
    const sortedScores = await subjectsModel.sortScoreDesc();

    if (sortedScores && sortedScores.length > 0) {
      res.status(200).json({ success: true, sortedScores });
    } else {
      res.status(404).json({ success: false, message: 'Sorted scores not found' });
    }
  } catch (error) {
    next(error);
  }
};