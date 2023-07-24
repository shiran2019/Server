const express = require("express");
const router = express.Router();
const { CreateEvo } = require("../models");
const { validateToken } = require("../middlewares/Authmiddleware");

router.get("/", async (req, res) => {
  const listOfEvos = await CreateEvo.findAll();
  res.json(listOfEvos);
});

router.post("/", async (req, res) => {
  const evo = req.body;
  const createdEvos = await CreateEvo.create(evo);
  res.json(createdEvos);
});

router.get("/evo", async (req, res) => {
  const listOfEvoss = await CreateEvo.findAll({
    attributes: ["EvoType", "EvoId"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfEvoss);
});
router.put("/upd/:EvoId", async (req, res) => {
  const Id = req.params.EvoId;
  const updatedData = req.body;

  try {
    // Find the student by ID
    const evo = await CreateEvo.findByPk(Id);

    // If the student doesn't exist, return an error response
    if (!evo) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the student's properties with the provided data
    await evo.update(updatedData);

    res.json({ message: "Student updated successfully", evo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
