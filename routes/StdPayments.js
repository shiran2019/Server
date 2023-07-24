const express = require("express");
const router = express.Router();
const { StdPayment } = require("../models");

router.get("/", async (req, res) => {
  const listOfPaymnts = await StdPayment.findAll();
  res.json(listOfPaymnts);
});


router.post("/", async (req, res) => {
  const pay = req.body;
  const createdPaymnt = await StdPayment.create(pay);
  res.json(createdPaymnt);
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

router.put("/upd/:id", async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;

  try {
    // Find the student by ID
    const student = await StdPayment.findByPk(studentId);

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
