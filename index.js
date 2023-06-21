const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/Comments", commentsRouter);

const studentsRouter = require("./routes/Students");
app.use("/students", studentsRouter);

const parentRouter = require("./routes/Parents");
app.use("/parents", parentRouter);

const teacherRouter = require("./routes/Teachers");
app.use("/teachers", teacherRouter);

const classRouter = require("./routes/Classes");
app.use("/classes", classRouter);

const termEvoRouter = require("./routes/TermEvos");
app.use("/termEvoluations", termEvoRouter);

const createEvoRouter = require("./routes/CreateEvos");
app.use("/createEvoluations", createEvoRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
