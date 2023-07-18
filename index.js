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

const UserRouter = require("./routes/Users");
app.use("/users", UserRouter);

const StdAttRouter = require("./routes/StdAttentances");
app.use("/StudentAttendance", StdAttRouter);

const TchAttRouter = require("./routes/TchAttendances");
app.use("/TeacherAttendance", TchAttRouter);

const StdPayRouter = require("./routes/StdPayments");
app.use("/StudentPayment", StdPayRouter);

const SalRouter = require("./routes/TchSalarys");
app.use("/teacherSalary", SalRouter);

const ApmntRouter = require("./routes/Appointments");
app.use("/appointments", ApmntRouter);

const ReqApmntRouter = require("./routes/RequestApmnts");
app.use("/appointmentRequest", ReqApmntRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
