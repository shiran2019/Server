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

module.exports = router;
