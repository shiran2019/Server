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

module.exports = router;
