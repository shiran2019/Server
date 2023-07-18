const express = require("express");
const router = express.Router();
const { Appointment } = require("../models");

router.post("/Appointments", async (req, res) => {
  const postData = req.body;

  const appointmentExists = await Appointment.findOne({ where: { id: postData.id } });

  if (appointmentExists) {
    // The appointment already exists, so update it
    await Appointment.update(postData, { where: { id: postData.id } });
  } else {
    // The appointment doesn't exist, so create a new one
    const newAppointment = await Appointment.create(postData);
    res.json(newAppointment);
    return;
  }

  // Return the updated appointment
  const updatedAppointment = await Appointment.findOne({ where: { id: postData.id } });
  res.json(updatedAppointment);
});

router.get("/Appointments/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  const appointments = await Appointment.findAll({ where: { teacherId } });
  res.json(appointments);
});


router.delete("/Appointments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findOne({ where: { id } });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    await Appointment.destroy({ where: { id } });

    res.json({ message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred while deleting the appointment." });
  }
});

module.exports = router;
