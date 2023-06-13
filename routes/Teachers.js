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

module.exports = router;
