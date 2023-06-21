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

module.exports = router;
