const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");

const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
const app = express();
const employeeRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("short"));
app.use(express.static("./public"));

module.exports = employeeRouter;

let validateEmployee = (req, res, next) => {
    let empData = req.body.employee;
    console.log(empData);
    if (!empData.name || !empData.position || !empData.wage) {
        res.sendStatus(400);
    }
    next();
};

// get all employed employees
employeeRouter.get("/", (req, res, next) => {
    const empID = req.baseUrl.split("/")[3];
    if (!empID) {
        db.all("select * from Employee where is_current_employee = 1;", 
            (err, rows) => {
                if (err) {
                    return res.sendStatus(400);
                }
                return res.status(200).send({employees: rows});
            });
    } else {
        db.serialize(() => {
            db.get("select * from Employee where id = $id", {$id: empID}, 
                (err, row) => {
                    if (err) {
                        return res.sendStatus(404);
                    } else if (row) {
                        return res.status(201).send({employee: row});
                    }
                    return res.sendStatus(404);
                });
        });
    }
});

// create a new employee
employeeRouter.post("/", validateEmployee, (req, res, next) => {
    db.run(`insert into Employee (name, position, wage)
        values (name = $name, position = $pos,
            wage = $wage);`, {$name: req.body.employee.name,
        $pos: req.body.employee.position,
        $wage: req.body.employee.wage}, function(err) {
        if (err) {
            return res.sendStatus(err);
        }
        return res.sendStatus(201);
    });
});