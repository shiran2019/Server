const express = require("express");
const router = express.Router();
const { Student } = require("../models");

// router.get("/:id", async (req, res) => {
//   const parentId = req.params.parentId;
//   const students = await Students.findAll({ where: { ParentId: parentId } });
//   res.json(students);
// });

router.get("/", async (req, res) => {
  const listOfStudents = await Student.findAll();
  res.json(listOfStudents);
});

router.get("/byId/:studentId", async (req, res) => {
  const id = req.params.studentId;
  const student = await Student.findByPk(id);
  res.json(student);
});

router.post("/", async (req, res) => {
  const student = req.body;
  await Student.create(student);
  res.json(student);
});

module.exports = router;
