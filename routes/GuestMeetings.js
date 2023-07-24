const express = require("express");
const router = express.Router();
const { GuestMeeting } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await GuestMeeting.findAll();
  res.json(listOfPosts);
});


router.post("/", async (req, res) => {
  const post = req.body;
  await GuestMeeting.create(post);
  res.json(post);
});

router.put("/upd/:id", async (req, res) => {
  const Id = req.params.id;
  const updatedData = req.body;

  try {
    // Find the student by ID
    const meeting = await GuestMeeting.findByPk(Id);

    // If the student doesn't exist, return an error response
    if (!meeting) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the student's properties with the provided data
    await meeting.update(updatedData);

    res.json({ message: "Student updated successfully", meeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

