const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");

const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
db.get("PRAGMA foreign_keys = ON");
const app = express();
const timesheetRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("short"));
app.use(express.static("./public"));

module.exports = timesheetRouter;

let getParams = (req, res, next) => {
    // console.log(req.baseUrl.split("/"));
    req.empID = req.baseUrl.split("/")[3];
    req.tsID = req.baseUrl.split("/")[5];
    next();
};

let checkEmp = (id) => {
    console.log(id);
    db.get("select * from Employee where id = $id", {$id: id},
        (err, row) => {
            if (err || row === undefined) {
                return false;
            } else {
                return true;
            }
        });
};

let checkTS = (id) => {
    db.get("select * from Timesheet where id = $id", {$id: id} , 
        (err, row) => {
            if (err || row === undefined) {
                return null;
            }
        });
};

let dataCheck = (req, res, next) => {
    const tsData = req.body.timesheet;
    if (!tsData.hours || !tsData.rate || !tsData.date) {
        res.sendStatus(400);
    }
    next();
};

// get all timesheets
timesheetRouter.get("/", getParams, (req, res, next) => {
    console.log(checkEmp(req.empID));
    if (req.empID && checkEmp(req.empID)) {
        db.all("select * from Timesheet where employee_id = $id", {$id: req.empID},
            (err, rows) => {
                if (err) {
                    throw new Error(err);
                }
                return res.status(200).send({timesheets: rows});
            });
    } else {
        return res.status(404).send("Nothing to see here");
    }
});

// create new timesheet
timesheetRouter.post("/", getParams, (req, res, next) => {
    const tsData = req.body.timesheet;
    console.log("ID", req.empID);
    db.run(`insert into Timesheet (hours, rate, date, employee_id) 
        values ($hours, $rate, $date, $emp);`, {
        $hours: tsData.hours,
        $rate: tsData.rate,
        $date: tsData.date,
        $emp: req.empID
    }, function(err) {
        if (err) {
            return res.status(404).send(err);
        } else {
            db.get("select * from Timesheet where id = $id", {$id: this.lastID},
                (err, row) => {
                    return res.status(201).send({timesheet: row});
                });
        }
    });
});

// edit existing timesheet
timesheetRouter.put("/", getParams, checkEmp, checkTS, dataCheck, (req, res, next) => {
    const tsData = req.body.timesheet;
    console.log(tsData);
    db.run(`update Timesheet set hours = $hours, rate = $rate, date = $rate 
    where id = $id`, {
        $hours: tsData.hours,
        $rate: tsData.rate,
        $date: tsData.date,
        $id: req.tsID
    }, function(err) {
        if (err) {
            return res.status(404).send(err);
        }
        db.get("select * from Timesheet where id = $id", {$id: this.lastID},
            (err, row) => {
                return res.status(201).send({timesheet: row});
            });
    });
});

