const express = require("express");
const router = express.Router();
const { StdPayment } = require("../models");

router.get("/", async (req, res) => {
  const listOfPaymnts = await StdPayment.findAll();
  res.json(listOfPaymnts);
});

router.post("/", async (req, res) => {
  const pay = req.body;
  const createdPaymnt = await StdPayment.create(pay);
  res.json(createdPaymnt);
});

module.exports = router;
