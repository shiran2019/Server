const express = require("express");
const router = express.Router();
const { Teacher } = require("../models");

router.get("/", async (req, res) => {
  const listOfTeachers = await Teacher.findAll();
  res.json(listOfTeachers);
});

router.post("/", async (req, res) => {
  const teacher = req.body;
  const createdTeacher = await Teacher.create(teacher);
  res.json(createdTeacher);
});

router.get("/lastId", async (req, res) => {
  const lastTeacher = await Teacher.findOne({
    order: [["teacherId", "DESC"]],
  });
  const lastTeacherId = lastTeacher ? lastTeacher.teacherId : null;
  res.json({ id: lastTeacherId });
});

router.get("/tch", async (req, res) => {
  const listOfteachers = await Teacher.findAll({
    attributes: ["teacherId", "fName"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfteachers);
});

module.exports = router;
