const express = require("express");
const router = express.Router();
const { BestKid } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await BestKid.findAll();



  const today = new Date().toLocaleDateString("en-US").substr(0, 10);
  console.log(today);
  
  const todayData = listOfPosts.filter((post) => post.Day === today);

  // Assuming post.Day is in ISO format (e.g., "YYYY-MM-DD")
  

  res.json(todayData);
});

router.get("/a", async (req, res) => {
  const listOfPosts = await BestKid.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await BestKid.create(post);
  res.json(post);
});

router.delete("/ann/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await BestKid.findOne({ where: { id } });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    await BestKid.destroy({ where: { id } });

    res.json({ message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred while deleting the appointment." });
  }
});

module.exports = router;

