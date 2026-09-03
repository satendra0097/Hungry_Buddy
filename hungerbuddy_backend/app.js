var dotenv = require("dotenv");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var compression = require("compression");
var axios = require("axios");

dotenv.config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var categoryRouter = require("./routes/category");
var branchRouter = require("./routes/branch");
var statecityRouter = require("./routes/statecity");
var fooditemRouter = require("./routes/fooditem");
var batchRouter = require("./routes/batch");
var sectionRouter = require("./routes/section");
var studentRouter = require("./routes/student");
var adminsRouter = require("./routes/admin");
var employeeRouter = require("./routes/employee");
var deliveryRouter = require("./routes/delivery");
var picturesRouter = require("./routes/pictures");
var addressRouter = require("./routes/address");

var app = express();

app.use(compression());

app.use(cors());

app.use(logger(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1y",
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/category", categoryRouter);
app.use("/branch", branchRouter);
app.use("/statecity", statecityRouter);
app.use("/fooditem", fooditemRouter);
app.use("/batch", batchRouter);
app.use("/section", sectionRouter);
app.use("/student", studentRouter);
app.use("/admin", adminsRouter);
app.use("/employee", employeeRouter);
app.use("/delivery", deliveryRouter);
app.use("/pictures", picturesRouter);
app.use("/address", addressRouter);

app.get("/wake-up", (req, res) => {
  res.status(200).json({ status: "awake", time: new Date().toISOString() });
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
    error: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

if (process.env.backend) {
  function keepServerAlive() {
    axios
      .get(process.env.backend, { timeout: 10000, headers: { "User-Agent": "Keep-Alive-Service" } })
      .then(() => {})
      .catch(() => {});
  }
  setTimeout(keepServerAlive, 10000);
  setInterval(keepServerAlive, 14.5 * 60 * 1000);
}

module.exports = app;
