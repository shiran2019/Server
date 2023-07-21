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

router.get("/pay/:StudentId", async (req, res) => {
  const { StudentId } = req.params;
  const result = await StdPayment.findAll({
    where: { StudentId: StudentId },
  });

  const formattedList = result.map((evo) => ({
    id: evo.id,
    Day: evo.Day,
    Payment: evo.Payment,
    Note: evo.Note,
    Month: evo.Month,
  }));
  res.json(formattedList);
});
module.exports = router;
