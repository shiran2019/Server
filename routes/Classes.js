const express = require("express");
const router = express.Router();
const { Class,Teacher } = require("../models");

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
  const { teacherId, className } = req.body;

  try {
    // Check if a record with the same teacherId and Month exists
    const existingRecord = await Class.findOne({
      where: {
        teacherId,
      },
    });

    if (existingRecord) {
      // Return an error response if the record already exists
      return res
        .status(400)
        .json({ error: "Data already exists in the database" });
    } else {
      // Create a new record
      const newRecord = await Class.create({
        teacherId,
        className,
      });
      return res.json(newRecord);
    }
  } catch (error) {
    // Handle any other errors that may occur during the process
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/clsDetails", async (req, res) => {
  const listOfclasses = await Class.findAll({
    attributes: ["className", "teacherId"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfclasses);
});


router.get("/clsTeachDetails/:className", async (req, res) => {
 const className = req.params.className;
  const listOfclasses = await Class.findOne({
    where: { className: className },
    include: [
      {
        model: Teacher,
        attributes: ['teacherId', 'fName', 'lName'],
      }
    ],

})  
  res.json(listOfclasses);

});


module.exports = router;
