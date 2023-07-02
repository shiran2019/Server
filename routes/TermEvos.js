const express = require("express");
const router = express.Router();
const { TermEvo } = require("../models");

router.get("/", async (req, res) => {
  const listOfEvoss = await TermEvo.findAll();
  res.json(listOfEvoss);
});

router.post("/", async (req, res) => {
  const evo = req.body;
  const createdEvo = await TermEvo.create(evo);
  res.json(createdEvo);
});

router.get("/:createEvoId", async (req, res) => {
  const { createEvoId } = req.params;
  const termEvo = await TermEvo.findAll({
    where: { CreateEvoId: createEvoId },
  });

  const formattedList = termEvo.map((evo) => ({
    CreateEvoId: evo.CreateEvoId,
    StudentId: evo.StudentId,
    Mark: evo.Mark,
  }));
  res.json(formattedList);
});

module.exports = router;
