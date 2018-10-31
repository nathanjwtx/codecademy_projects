const express = require("express");
const morgan = require("morgan");
const sqlite3 = require("sqlite3");

const app = express();
const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("tiny"));
app.use(express.static("public"));

const employee = require("./routes/employeeRouter");
const timesheet = require("./routes/timesheetRouter");

app.use("/api/employees/:empId?", employee);
app.use("/api/employees/:id/timesheets/:tsID?", timesheet);

// need this for testing
module.exports = app;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});