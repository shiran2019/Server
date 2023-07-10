const express = require("express");
const router = express.Router();
const { TchSalary } = require("../models");

router.get("/", async (req, res) => {
  const listOfsal = await TchSalary.findAll();
  res.json(listOfsal);
});

router.post("/d", async (req, res) => {
  const post = req.body;
  await TchSalary.create(post);
  res.json(post);
});

router.post("/", async (req, res) => {
  const { teacherId, Month, Day, Salary, epfRate, Allowance, Basic } = req.body;

  try {
    // Check if a record with the same teacherId and Month exists
    const existingRecord = await TchSalary.findOne({
      where: {
        teacherId,
        Month,
      },
    });

    if (existingRecord) {
      // Return an error response if the record already exists
      return res
        .status(400)
        .json({ error: "Data already exists in the database" });
    } else {
      // Create a new record
      const newRecord = await TchSalary.create({
        teacherId,
        Month,
        Day,
        Salary,
        epfRate,
        Allowance,
        Basic,
      });
      return res.json(newRecord);
    }
  } catch (error) {
    // Handle any other errors that may occur during the process
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
