const express = require("express");
const router = express.Router();
const { Class } = require("../models");

router.get("/", async (req, res) => {
  const listOfClass = await Class.findAll();
  res.json(listOfClass);
});

router.get("/cls", async (req, res) => {
  const listOfClass = await Class.findAll({
    attributes: ["className"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfClass);
});

router.post("/", async (req, res) => {
  const classr = req.body;
  const createdClass = await Class.create(classr);
  res.json(createdClass);
});

module.exports = router;
