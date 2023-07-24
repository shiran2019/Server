const express = require("express");
const router = express.Router();
const { StdAttendance, Student } = require("../models");

router.get("/", async (req, res) => {
  const listOfATTs = await StdAttendance.findAll();
  res.json(listOfATTs);
});

router.post("/", async (req, res) => {
  const { StudentId, Day, Attendance } = req.body;

  const existingAtt = await StdAttendance.findOne({
    where: { StudentId, Day },
  });

  if (existingAtt) {
    res.json({
      error: "Attendance for the given student and day already exists.",
    });
  } else {
    const createdAtt = await StdAttendance.create({
      StudentId,
      Day,
      Attendance,
    });
    res.json(createdAtt);
  }
});

router.get("/attendance", async (req, res) => {
  try {
    const attendanceList = await Student.findAll({
      attributes: ["StudentId"],
      include: [
        {
          model: StdAttendance,
          attributes: ["StudentId", "Day", "Attendance"],
          foreignKey: "StudentId",
        },
      ],
    });

    const formattedList = attendanceList.map((attendance) => {
      const { Student, ...attendanceData } = attendance.toJSON();
      return attendanceData;
    });

    const mergedList = formattedList.reduce((acc, curr) => {
      if (!curr) return acc; // Skip undefined/null values
      const { className, ...attendanceData } = curr;
      const classAttendance = acc[className] || {};
      const mergedAttendance = { ...classAttendance, ...attendanceData };
      return { ...acc, [className]: mergedAttendance };
    }, {});

    const attendanceRecords = [];
    for (const className in mergedList) {
      const classAttendance = mergedList[className];
      for (const attendanceRecord of classAttendance.StdAttendances) {
        const { StudentId, Day, Attendance } = attendanceRecord;
        attendanceRecords.push({
          StudentId,
          Day,
          Attendance,
          className: className,
        });
      }
    }

    res.json(attendanceRecords);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve attendance." });
  }
});

router.put("/upd/:StudentId/:Day", async (req, res) => {
  const studentId = req.params.StudentId;
  const day = req.params.Day; // Make sure to use the correct case for the parameter name (Day instead of DAY)

  const updatedData = req.body;

  try {
    // Find the teacher by teacherId and Day
    const student = await StdAttendance.findOne({
      where: {
        StudentId: studentId,
        Day: day,
      },
    });

    // If the teacher doesn't exist, return an error response
    if (!student) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Update the teacher's properties with the provided data
    await student.update(updatedData);

    res.json({ message: "Teacher updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/attendances", async (req, res) => {
  try {
    const attendanceList = await StdAttendance.findAll({
      attributes: ["StudentId", "Day", "Attendance"],
      include: [
        {
          model: Student,
          attributes: ["StudentId", "className"],
          foreignKey: "StudentId",
        },
      ],
    });

    const formattedList = attendanceList.map((attendance) => ({
   
        StudentId: attendance.StudentId,
        Day: attendance.Day,
        Attendance: attendance.Attendance,
        className: attendance.Student.className
      
     
    }));
res.json(formattedList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve attendance." });
  }
});

module.exports = router;
