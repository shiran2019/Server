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

module.exports = router;
