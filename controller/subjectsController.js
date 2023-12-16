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
//! 해당 과목 코드까지 불러오기 구현
exports.changeScore = async function (req, res, next) {
    try {
      const { newGrade, subject_code } = req.body;
  
      await subjectsModel.changeScore(newGrade, subject_code, req.user);
  
      res.status(200).json({ success: true, message: 'Score updated successfully' });
    } catch (error) {
      next(error);
    }
};

//과목수정 컨트롤러
exports.editSubject = async function (req, res, next) {
    try {
      const { subject_code, date, new_subject_name, new_subject_code, new_academic_credit, new_grade } = req.body;
      await subjectsModel.editSubject(req.user, subject_code, date, new_subject_name, new_subject_code, new_academic_credit, new_grade);
  
      res.status(200).json({ success: true, message: 'Score updated successfully' });
    } catch (error) {
      next(error);
    }
};

//과목정보 불러오기 컨트롤러
exports.getSubjectInfo = async (req, res, next) => {
  const { subject_code, date } = req.params;
  const subjectInfo = await subjectsModel.getSubjectInfo(req.user , subject_code, date);
  try {
    if (subjectInfo) {
      res.status(200).json({ success: true, subjectInfo });
    } else {
      res.status(404).json({ success: false, message: 'Subject not found' });
    }
  } catch (error) {
    next(error);
  }
}

//평균학점 계산 컨트롤러
exports.avgScore = async function (req, res, next) {
  try {
    const averageScore = await subjectsModel.avgScore(req.user);

    if (averageScore) {
      res.status(200).json({ success: true, averageScore });
    } else {
      res.status(404).json({ success: false, message: 'Average score not found' });
    }
  } catch (error) {
    next(error);
  }
};

//학기 평균 학점 계산 컨트롤러
exports.semesterAvgScore = async function (req, res, next) {
  try {
    const averageScore = await subjectsModel.semesterAvgScore(req.user, req.body.date);

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

    const result = await subjectsModel.Graduated(req.user);

    if (result && result.length > 0) {
      res.status(200).json({ success: true, result });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    next(error);
  }
};

//들은과목 수 확인
exports.listenSubject = async function (req, res, next) {
  try {
    const result = await subjectsModel.listenSubject(req.user);

    if (result && result.length > 0) {
      res.status(200).json({ success: true, message: 'Student scores exist', result });
    } else {
      res.status(404).json({ success: false, message: 'Student scores not found' });
    }
  } catch (error) {
    next(error);
  }
}; 

//통합정렬
exports.filterAndSortScores = async function (req, res, next) {
  try {
    const { date, filter, sort, order } = req.body;
    let scores;

    scores = await subjectsModel.filterAndSortScores(req.user, date, filter, sort, order);

    if (scores && scores.length > 0) {
      res.status(200).json({ success: true, scores });
    } else {
      res.status(404).json({ success: false, message: 'No scores found' });
    }
  } catch (error) {
    next(error);
  }
};

//성적삭제
exports.deleteScore = async function (req, res, next) {
  try {
    const { subject_code } = req.body;

    const success = await subjectsModel.deleteScore(req.user, subject_code);

    if (success) {
      res.status(200).json({ success: true, message: 'Score successfully deleted' });
    } else {
      res.status(404).json({ success: false, message: 'Score not found or already deleted' });
    }
  } catch (error) {
    next(error);
  }
};

//졸업요건정렬
exports.sortGraduated = async function (req, res, next) {
  try {
    const { filter, sort, order } = req.body;
    let scores;

    scores = await subjectsModel.sortGraduated(req.user, filter, sort, order);

    if (scores && scores.length > 0) {
      res.status(200).json({ success: true, scores });
    } else {
      res.status(404).json({ success: false, message: 'No scores found' });
    }
  } catch (error) {
    next(error);
  }
};