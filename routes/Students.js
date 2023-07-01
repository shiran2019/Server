const express = require("express");
const router = express.Router();
const { Student, Sequelize } = require("../models");

router.get("/", async (req, res) => {
  const listOfStudents = await Student.findAll();
  res.json(listOfStudents);
});

router.get("/byId/:studentId", async (req, res) => {
  const id = req.params.studentId;
  const student = await Student.findByPk(id);
  res.json(student);
});

router.get("/lastId", async (req, res) => {
  const lastStudent = await Student.findOne({
    order: [["studentId", "DESC"]],
  });
  const lastStudentId = lastStudent ? lastStudent.studentId : null;
  res.json({ id: lastStudentId });
});

router.get("/classCount", async (req, res) => {
  const classCounts = await Student.findAll({
    attributes: [
      "ClassClassName",
      [Sequelize.fn("COUNT", Sequelize.col("ClassClassName")), "count"],
    ],
    group: ["ClassClassName"],
  });
  const result = classCounts.map(({ ClassClassName, dataValues }) => ({
    className: ClassClassName,
    count: dataValues.count,
  }));
  res.json(result);
});

router.post("/", async (req, res) => {
  const student = req.body;
  await Student.create(student);
  res.json(student);
});

router.get("/studentList", async (req, res) => {
  const listOfStudents = await Student.findAll({
    attributes: [
      "studentId",
      "fName",
      "lName",
      "gender",
      "birthday",
      "ClassClassName",
      "regyear",
      "pNote",
    ],
  });

  // Extract the required properties for each student and assign a unique id
  const formattedList = listOfStudents.map((student, index) => ({
    id: index + 1, // Assign a unique id based on the index (starting from 1)
    studentId: student.studentId,
    fName: student.fName,
    lName: student.lName,
    gender: student.gender,
    birthday: student.birthday,
    ClassClassName: student.ClassClassName,
    regyear: student.regyear,
    pNote: student.pNote,
  }));

  res.json(formattedList);
});

router.get("/class/:className", async (req, res) => {
  const className = req.params.className;

  // Find all students in the specified class
  const studentsInClass = await Student.findAll({
    where: {
      ClassClassName: className,
    },
  });

  // Extract the required properties for each student
  const formattedList = studentsInClass.map((student) => ({
    studentId: student.studentId,
    fName: student.fName,
    pNote: student.pNote,
  }));

  res.json(formattedList);
});

module.exports = router;
