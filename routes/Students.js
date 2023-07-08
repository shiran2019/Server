const express = require("express");
const router = express.Router();
const { Student, Sequelize } = require("../models");

router.get("/", async (req, res) => {
  const listOfStudents = await Student.findAll();
  res.json(listOfStudents);
});

router.get("/byId/:StudentId", async (req, res) => {
  const id = req.params.StudentId;
  const student = await Student.findByPk(id);
  res.json(student);
});

router.get("/lastId", async (req, res) => {
  const lastStudent = await Student.findOne({
    order: [["StudentId", "DESC"]],
  });
  const lastStudentId = lastStudent ? lastStudent.StudentId : null;
  res.json({ id: lastStudentId });
});

router.get("/classCount", async (req, res) => {
  const classCounts = await Student.findAll({
    attributes: [
      "className",
      [Sequelize.fn("COUNT", Sequelize.col("className")), "count"],
    ],
    group: ["className"],
  });
  const result = classCounts.map(({ className, dataValues }) => ({
    className: className,
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
      "StudentId",
      "fName",
      "lName",
      "gender",
      "birthday",
      "className",
      "regyear",
      "pNote",
    ],
  });

  // Extract the required properties for each student and assign a unique id
  const formattedList = listOfStudents.map((student, index) => ({
    id: index + 1, // Assign a unique id based on the index (starting from 1)
    StudentId: student.StudentId,
    fName: student.fName,
    lName: student.lName,
    gender: student.gender,
    birthday: student.birthday,
    className: student.className,
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
      className: className,
    },
  });

  // Extract the required properties for each student
  const formattedList = studentsInClass.map((student) => ({
    StudentId: student.StudentId,
    fName: student.fName,
    pNote: student.pNote,
  }));

  res.json(formattedList);
});

module.exports = router;
