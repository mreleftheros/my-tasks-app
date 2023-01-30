const express = require("express");
const app = express();
const taskRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

module.exports = app;
