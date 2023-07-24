const express = require("express");
const router = express.Router();
const { Teacher,Class } = require("../models");

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

router.get("/teacherList", async (req, res) => {
  const listOfTeachersall = await Teacher.findAll({
    attributes: [
      "teacherId",
      "fName",
      "lName",
      "teacherNIC",
      "teacherNo",
      "teacherEmail",
      "regDate",
    ],
  });
  // Extract the required properties for each student and assign a unique id
  const formattedList = listOfTeachersall.map((teacher, index) => ({
    id: index + 1, // Assign a unique id based on the index (starting from 1)
    teacherId: teacher.teacherId,
    fName: teacher.fName,
    lName: teacher.lName,
    teacherNIC: teacher.teacherNIC,
    teacherNo: teacher.teacherNo,
    teacherEmail: teacher.teacherEmail,
    regDate: teacher.regDate,
  }));
  res.json(formattedList);
});

router.get("/byTeacherId/:teacherId", async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const teacher = await Teacher.findOne({
      where: { teacherId: teacherId },
      include: [
        {
          model: Class,
          attributes: ['className'],
        }
      ],
    });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Extract className from the first element of the "Classes" array, if available
    const className = teacher.Classes.length > 0 ? teacher.Classes[0].className : null;

    // Create a new object with the desired format
    const formattedTeacher = {
      teacherId: teacher.teacherId,
      fName: teacher.fName,
      lName: teacher.lName,
      fullname: teacher.fullname,
      address: teacher.address,
      teacherNIC: teacher.teacherNIC,
      teacherNo: teacher.teacherNo,
      teacherEmail: teacher.teacherEmail,
      regDate: teacher.regDate,
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
      className: className,
    };

    res.json(formattedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put("/upd/:teacherId", async (req, res) => {
  const studentId = req.params.teacherId;
  const updatedData = req.body;

  try {
    // Find the student by ID
    const teacher = await Teacher.findByPk(studentId);

    // If the student doesn't exist, return an error response
    if (!teacher) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the student's properties with the provided data
    await teacher.update(updatedData);

    res.json({ message: "Student updated successfully", teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
