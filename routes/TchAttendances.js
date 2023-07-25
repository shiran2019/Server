const express = require("express");
const router = express.Router();
const { TchAttendance, Class } = require("../models");

router.get("/", async (req, res) => {
  const listOfATTs = await TchAttendance.findAll();
  res.json(listOfATTs);
});

router.post("/", async (req, res) => {
  const { teacherId, Day, Attendance } = req.body;

  // Check if any of the required properties are null
  if (!teacherId || !Day || Attendance === null) {
    res.json({
      error: "Fill all nessary details.",
    });
  }

  const existingAtt = await TchAttendance.findOne({
    where: { teacherId, Day },
  });

  if (existingAtt) {
    res.json({
      error: "Attendance for the given student and day already exists.",
    });
  } else {
    const createdAtt = await TchAttendance.create({
      teacherId,
      Day,
      Attendance,
    });
    res.json(createdAtt);
  }
});


router.get("/attendance", async (req, res) => {
  try {
    const attendanceList = await Class.findAll({
      attributes: ["ClassClassName"],
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
      const { ClassClassName, ...attendanceData } = curr;
      const classAttendance = acc[ClassClassName] || {};
      const mergedAttendance = { ...classAttendance, ...attendanceData };
      return { ...acc, [ClassClassName]: mergedAttendance };
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
          ClassClassName: className,
        });
      }
    }

    res.json(attendanceRecords);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve attendance." });
  }
});

router.put("/upd/:teacherId/:Day", async (req, res) => {
  const teacherId = req.params.teacherId;
  const day = req.params.Day; // Make sure to use the correct case for the parameter name (Day instead of DAY)

  const updatedData = req.body;

  try {
    // Find the teacher by teacherId and Day
    const teacher = await TchAttendance.findOne({
      where: {
        teacherId: teacherId,
        Day: day,
      },
    });

    // If the teacher doesn't exist, return an error response
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Update the teacher's properties with the provided data
    await teacher.update(updatedData);

    res.json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
