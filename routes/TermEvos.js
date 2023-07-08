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

module.exports = router;
