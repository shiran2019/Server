const express = require("express");
const router = express.Router();
const { TermEvo ,CreateEvo} = require("../models");

router.get("/", async (req, res) => {
  const listOfEvoss = await TermEvo.findAll();
  res.json(listOfEvoss);
});

router.post("/", async (req, res) => {
  const evo = req.body;
  const createdEvo = await TermEvo.create(evo);
  res.json(createdEvo);
});

router.get("/:EvoId", async (req, res) => {
  const { EvoId } = req.params;
  const termEvo = await TermEvo.findAll({
    where: { EvoId: EvoId },
  });

  const formattedList = termEvo.map((evo) => ({
    EvoId: evo.EvoId,
    StudentId: evo.StudentId,
    Mark: evo.Mark,
    id: evo.id,
  }));
  res.json(formattedList);
});

router.get("/student/:StudentId", async (req, res) => {
  const { StudentId } = req.params;
  const termEvo = await TermEvo.findAll({
    where: { StudentId: StudentId },
    include: [
      {
        model: CreateEvo,
        attributes: ["EvoType", "EvoId", "Activity"],
      },
    ],
  }); 



  const formattedList = termEvo.map((evo) => ({
    EvoType: evo.CreateEvo.EvoType,
    Activity: evo.CreateEvo.Activity,
    StudentId: evo.StudentId,
    Mark: evo.Mark,
    id: evo.id,
  }));
  res.json(formattedList);
});


router.put("/upd/:id", async (req, res) => {
  const Id = req.params.id;
  const updatedData = req.body;

  try {
    // Find the student by ID
    const student = await TermEvo.findByPk(Id);

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
