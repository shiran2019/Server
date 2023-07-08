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
      attributes: ["className"],
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
module.exports = router;
