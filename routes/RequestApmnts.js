const express = require("express");
const router = express.Router();
const { RequestApmnt, Teacher, Student } = require("../models");

// router.get("/", async (req, res) => {
//   const lists = await RequestApmnt.findAll();
//   res.json(lists);
// });


router.get("/:StudentId", async (req, res) => {
  const { StudentId } = req.params;

  try {
    const requestApmnts = await RequestApmnt.findAll({
      where: { StudentId: StudentId, Status: "Approved" },
      include: {
        model: Teacher,
        attributes: ["fName"],
      },
    });
    if (!requestApmnts || requestApmnts.length === 0) {
      return res.status(404).json({ error: "No requests found" });
    }
    const response = requestApmnts.map((requestApmnt) => {
      const { Teacher } = requestApmnt;
      return {
        ...requestApmnt.toJSON(),
        fName: Teacher.fName,
      };
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/", async (req, res) => {
  const post = req.body;
  await RequestApmnt.create(post);
  res.json(post);
});

router.post("/:id/updateStatus", async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;

  try {
    const requestApmnt = await RequestApmnt.findByPk(id);
    if (!requestApmnt) {
      return res.status(404).json({ error: "Request not found" });
    }

    requestApmnt.Status = Status;
    await requestApmnt.save();

    res.json(requestApmnt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const requestApmnt = await RequestApmnt.findByPk(id);
    if (!requestApmnt) {
      return res.status(404).json({ error: "Request not found" });
    }

    await requestApmnt.destroy();

    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/", async (req, res) => {
  const lists = await RequestApmnt.findAll(
    {
      where: { Status: "Pending" },
    }
  );
  res.json(lists);
});



router.get("/tch/:teacherId", async (req, res) => {
  const { teacherId } = req.params;

  try {
    const requestApmnts = await RequestApmnt.findAll({
      attributes: ["id", "Note", "Day", "time", "Status", "StudentId", "teacherId"],
      where: { teacherId: teacherId, Status: "Pending" },
      include: {
        model: Student,
        attributes: ["fName","StudentId"],
      },
    });
    
    const response = requestApmnts.map((requestApmnt) =>( {
      StudentId : requestApmnt.StudentId,
      fName : requestApmnt.Student.fName,
      Note : requestApmnt.Note,
      Day : requestApmnt.Day,
      time : requestApmnt.time,
      id : requestApmnt.id,
      Status : requestApmnt.Status,
    
    }));

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
