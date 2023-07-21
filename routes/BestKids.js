const express = require("express");
const router = express.Router();
const { BestKid } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await BestKid.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await BestKid.create(post);
  res.json(post);
});

module.exports = router;

