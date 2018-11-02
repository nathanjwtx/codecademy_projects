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
const menu = require("./routes/menuRouter");
const menuItem = require("./routes/menuItemRouter");

app.use("/api/employees/:empId?", employee);
app.use("/api/employees/:id/timesheets/:tsID?", timesheet);
app.use("/api/menus/:menuId/menu-items/:menuItemId?", menuItem);
app.use("/api/menus/:menuID?", menu);


// need this for testing
module.exports = app;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});