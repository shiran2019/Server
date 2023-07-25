const express = require("express");
const router = express.Router();
const { SpecialNote } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await SpecialNote.findAll();

  // Filter only today's data based on the "Day" field
  const today = new Date().toLocaleDateString("en-US").slice(0, 10);
  const todayData = listOfPosts.filter((post) => post.Day === today);

  res.json(todayData);
});
router.post("/", async (req, res) => {
  const post = req.body;
  await SpecialNote.create(post);
  res.json(post);
});
router.get("/role/:role", async (req, res) => {
    const { role } = req.params;
    const listOfPosts = await SpecialNote.findAll();
  
    // Filter data based on both "Day" and "role" fields
    const today = new Date().toLocaleDateString("en-US").slice(0, 10);
    const todayDataWithRole = listOfPosts.filter((post) => post.Day === today && post.role === role);
  
    res.json(todayDataWithRole);
  });

  router.delete("/ann/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const appointment = await SpecialNote.findOne({ where: { id } });
  
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found." });
      }
  
      await SpecialNote.destroy({ where: { id } });
  
      res.json({ message: "Appointment deleted successfully." });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ error: "An error occurred while deleting the appointment." });
    }
  });

module.exports = router;

