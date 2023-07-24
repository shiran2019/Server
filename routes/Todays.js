const express = require("express");
const router = express.Router();
const { Today } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Today.findAll();
  res.json(listOfPosts);
});

router.post("/Today", async (req, res) => {
  const postData = req.body;

  const appointmentExists = await Today.findOne({ where: { id: postData.id } });

  if (appointmentExists) {
    // The appointment already exists, so update it
    await Today.update(postData, { where: { id: postData.id } });
  } else {
    // The appointment doesn't exist, so create a new one
    const newAppointment = await Today.create(postData);
    res.json(newAppointment);
    return;
  }

  // Return the updated appointment
  const updatedAppointment = await Today.findOne({ where: { id: postData.id } });
  res.json(updatedAppointment);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Today.create(post);
  res.json(post);
});

router.delete("/Today/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Today.findOne({ where: { id } });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    await Today.destroy({ where: { id } });

    res.json({ message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred while deleting the appointment." });
  }
});

module.exports = router;

