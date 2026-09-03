var dotenv = require("dotenv");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
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
var adminloginRouter = require("./routes/student");
var adminsRouter = require("./routes/admin");
var employeeRouter = require("./routes/employee");
var deliveryRouter = require("./routes/delivery");
var picturesRouter = require("./routes/pictures");
var addressRouter = require("./routes/address");

var app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.use(
  logger(process.env.NODE_ENV === "production" ? "tiny" : "dev")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "7d",
  })
);

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/category", categoryRouter);
app.use("/branch", branchRouter);
app.use("/statecity", statecityRouter);
app.use("/fooditem", fooditemRouter);
app.use("/batch", batchRouter);
app.use("/section", sectionRouter);
app.use("/student", studentRouter);
app.use("/adminlogin", adminloginRouter);
app.use("/admin", adminsRouter);
app.use("/employee", employeeRouter);
app.use("/delivery", deliveryRouter);
app.use("/pictures", picturesRouter);
app.use("/address", addressRouter);

// Wake-up endpoint
app.get("/wake-up", (req, res) => {
  console.log(
    "💤 Wake-up ping received at:",
    new Date().toISOString()
  );

  res.status(200).json({
    status: "awake",
    time: new Date().toISOString(),
  });
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;

  res.locals.error =
    req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  res.render("error");
});

// ============== KEEP ALIVE WITH AXIOS ==============

function keepServerAlive() {
  axios
    .get(process.env.backend, {
      timeout: 10000,
      headers: {
        "User-Agent": "Keep-Alive-Service",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(
          "✅ Server kept awake - Status:",
          response.status
        );

        console.log(
          "📡 Response time:",
          new Date().toISOString()
        );
      } else {
        console.log(
          "⚠️ Server responded with status:",
          response.status
        );
      }
    })
    .catch((error) => {
      if (error.code === "ECONNABORTED") {
        console.log(
          "❌ Wake-up failed: Request timeout"
        );
      } else if (error.response) {
        console.log(
          "❌ Wake-up failed - Status:",
          error.response.status
        );

        console.log(
          "❌ Error data:",
          error.response.data
        );
      } else if (error.request) {
        console.log(
          "❌ Wake-up failed: No response received"
        );
      } else {
        console.log(
          "❌ Wake-up failed:",
          error.message
        );
      }
    });
}

// First request after 10 seconds
setTimeout(() => {
  keepServerAlive();
}, 10000);

// Every 14.5 minutes
setInterval(() => {
  keepServerAlive();
}, 14.5 * 60 * 1000);

// Server start logs
console.log(
  "🚀 Server started at:",
  new Date().toISOString()
);

console.log(
  "⏰ Keep-alive service will ping every 14.5 minutes"
);

module.exports = app;