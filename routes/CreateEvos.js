const express = require("express");
const router = express.Router();
const { CreateEvo } = require("../models");

router.get("/", async (req, res) => {
  const listOfEvos = await CreateEvo.findAll();
  res.json(listOfEvos);
});

router.post("/", async (req, res) => {
  const evo = req.body;
  const createdEvos = await CreateEvo.create(evo);
  res.json(createdEvos);
});

module.exports = router;
