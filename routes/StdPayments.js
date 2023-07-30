const express = require("express");
const router = express.Router();
const { StdPayment ,Student } = require("../models");

router.get("/", async (req, res) => {
  const listOfPaymnts = await StdPayment.findAll();
  res.json(listOfPaymnts);
});


router.post("/", async (req, res) => {
  try {
    const pay = req.body;
    const { Month, StudentId } = pay;

    if (!Month || !StudentId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingPayment = await StdPayment.findOne({
      where: { Month: Month, StudentId: StudentId },
    });
    if (existingPayment) {
      res.json({ error: "Data already exists" });
    } else {
      await StdPayment.create(pay);
      res.json(pay);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get("/pay/:StudentId", async (req, res) => {
  const { StudentId } = req.params;
  const result = await StdPayment.findAll({
    where: { StudentId: StudentId },
  });

  const formattedList = result.map((evo) => ({
    id: evo.id,
    Day: evo.Day,
    Payment: evo.Payment,
    Note: evo.Note,
    Month: evo.Month,
  }));
  res.json(formattedList);
});

router.put("/upd/:StudentId/:Month", async (req, res) => {
  const StudentId = req.params.StudentId;
  const Month = req.params.Month;
  const updatedData = req.body;

  try {
    // Find the student by ID
    const student = await StdPayment.findOne({
      where: { StudentId: StudentId, Month: Month },
    })

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

module.exports = router;
