const express = require("express");
const router = express.Router();
const { Parent } = require("../models");

router.get("/", async (req, res) => {
  const listOfParents = await Parent.findAll();
  res.json(listOfParents);
});

router.get("/lastId", async (req, res) => {
  const lastParent = await Parent.findOne({
    order: [["parentId", "DESC"]],
  });
  const lastParentId = lastParent ? lastParent.parentId : null;
  res.json({ parentId: lastParentId });
});

router.post("/", async (req, res) => {
  const parent = req.body;
  const createdParent = await Parent.create(parent);
  res.json(createdParent);
});

module.exports = router;
