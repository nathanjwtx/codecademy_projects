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

let checkEmp = (req, res, next) => {
    db.get("select * from Employee where id = $id", {$id: req.empID},
        (err, row) => {
            console.log(req.empID);
            if (err || row === undefined) {
                res.sendStatus(404);
            } else {
                next();
            }
        });
};

let checkTS = (req, res, next) => {
    db.get("select * from Timesheet where Timesheet.id = $id", {$id: req.tsID} , 
        (err, row) => {
            if (err || row === undefined) {
                res.sendStatus(404);
            } else {
                next();
            }
        });
};

let dataCheck = (req, res, next) => {
    const tsData = req.body.timesheet;
    if (!tsData.hours || !tsData.rate || !tsData.date) {
        res.sendStatus(400);
    } else {
        next();
    }
};

"https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express?noredirect=1&lq=1"

// get all timesheets
timesheetRouter.get("/", getParams, checkEmp, (req, res, next) => {
    if (req.empID) {
        db.all("select * from Timesheet where employee_id = $id", {$id: req.empID},
            (err, rows) => {
                if (err) {
                    next(err);
                } else {
                    return res.status(200).send({timesheets: rows});
                }
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
    db.run(`update Timesheet set hours = $hours, rate = $rate, date = $date 
    where id = $id`, {
        $hours: tsData.hours,
        $rate: tsData.rate,
        $date: tsData.date,
        $id: req.tsID
    }, function(err) {
        if (err) {
            return res.status(404).send(err);
        }
        db.get("select * from Timesheet where id = $id", {$id: req.tsID},
            (err, row) => {
                return res.status(201).send({timesheet: row});
            });
    });
});

