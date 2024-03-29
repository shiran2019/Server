const express = require("express");
const router = express.Router();
const { Student,Parent,Class,Teacher, Sequelize } = require("../models");


router.get("/", async (req, res) => {
  const currentYear = new Date().getFullYear();
  const listOfStudents = await Student.findAll({
    where: {
      regyear: currentYear,
      status : 'Active'
    },
  });
  console.log(currentYear)
  res.json(listOfStudents);
});

router.get("/byId/:StudentId", async (req, res) => {
  const id = req.params.StudentId;
  const student = await Student.findByPk(id);
  res.json(student);
});

router.put("/upd/:StudentId", async (req, res) => {
  const studentId = req.params.StudentId;
  const updatedData = req.body;

  try {
    // Find the student by ID
    const student = await Student.findByPk(studentId);

    // If the student doesn't exist, return an error response
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the student's properties with the provided data
    await student.update(updatedData);

    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/bystudentId/:StudentId", async (req, res) => {
  try {
    const studentId = req.params.StudentId;
    const student = await Student.findOne({
      where: { StudentId: studentId },
      include: [
        {
          model: Parent,
          attributes: ['parentId', 'fatherName', 'fatherNIC', 'fatherNo', 'motherName', 'motherNIC', 'motherNo', 'pNote'],
        }
      ],
    });

   
 
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
    where: {
      regyear: new Date().getFullYear(),
      status : 'Active',
    },
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

router.get("/StdCount/:className", async (req, res) => {
  const className = req.params.className;
  const classCount = await Student.count({
    where: {
      className: className,
      regyear: new Date().getFullYear(),
      status : 'Active',
    },
  });
  res.json({ classCount });
});

router.post("/", async (req, res) => {
  const student = req.body;
  await Student.create(student);
  res.json(student);
});

router.get("/studentList", async (req, res) => {
  const listOfStudents = await Student.findAll({
    where: {
      regyear: new Date().getFullYear(),
      status : 'Active'
    },
    attributes: [
      "StudentId",
      "fName",
      "lName",
      "gender",
      "birthday",
      "className",
      "regyear",
      "pNote",
      "status"
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
    status: student.status
  }));

  res.json(formattedList);
});

router.get("/studentListAdmin", async (req, res) => {
  const listOfStudents = await Student.findAll({
    where: {
      regyear: new Date().getFullYear(),
      
    },
    attributes: [
      "StudentId",
      "fName",
      "lName",
      "gender",
      "birthday",
      "className",
      "regyear",
      "pNote",
      "status"
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
    status: student.status
  }));

  res.json(formattedList);
});



router.get("/class/:className", async (req, res) => {
  const className = req.params.className;

  // Find all students in the specified class
  const studentsInClass = await Student.findAll({
    where: {
      className: className,
      regyear: new Date().getFullYear(),
      status : 'Active'
    },
  });

  // Extract the required properties for each student
  const formattedList = studentsInClass.map((student,index) => ({
    id: index + 1, 
    StudentId: student.StudentId,
    fName: student.fName,
    pNote: student.pNote,

  }));

  res.json(formattedList);
});

router.get("/yearCount", async (req, res) => {
  const classCounts = await Student.findAll({
    attributes: [
      "regyear",
      [Sequelize.fn("COUNT", Sequelize.col("regyear")), "count"],
    ],
    group: ["regyear"],
  });
  const result = classCounts.map(({ regyear, dataValues }) => ({
    regyear: regyear,
    count: dataValues.count,
  }));
  res.json(result);
});

router.get("/daycare/:StudentId", async (req, res) => {
  const StudentId = req.params.StudentId;

  // Find all students in the specified class
  const studentsInClass = await Student.findAll({
    attributes: [ "StudentId", "dayCare"],
    where: {
      StudentId: StudentId,
      regyear: new Date().getFullYear(),
      status : 'Active'
    },
  });

  const formattedList = studentsInClass.map((student) => ({
    StudentId: student.StudentId,
    dayCare : student.dayCare,
  }));

  res.json(formattedList);

});


router.get("/Daycare", async (req, res) => {
 
 
  const studentsInClass = await Student.findAll({
    where: {
      dayCare: "DayCare",
      regyear: new Date().getFullYear(),
      status : 'Active'
    },
    include: [
      {
        model: Parent,
        attributes: [ 'fatherName',  'fatherNo', 'motherName',  'motherNo'],
      }
    ],


  });

  const formattedList = studentsInClass.map((student) => ({
    StudentId: student.StudentId,
    dayCare : student.dayCare,
    fName: student.fName,
    lName: student.lName,
    fatherName: student.Parent.fatherName,
    fatherNo: student.Parent.fatherNo,
    motherName: student.Parent.motherName,
    motherNo: student.Parent.motherNo,
    
  }));

  res.json(formattedList);

});


module.exports = router;
