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
    console.log(req.baseUrl);
    if (req.method != "DELETE" && (!empData.name || !empData.position || !empData.wage)) {
        return res.sendStatus(400);
    } else {
        next();
    }
};

let checkEmpID = (req, res, next) => {
    db.get("select * from Employee where id = $id", 
        {$id: req.baseUrl.split("/")[3]}, (err, row) => {
            if (err || row === undefined) {
                res.sendStatus(404);
            } else {
                next();
            }
        });
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
                        return res.status(200).send({employee: row});
                    }
                    return res.sendStatus(404);
                });
        });
    }
});

// create a new employee
employeeRouter.post("/", validateEmployee, (req, res, next) => {
    db.run(`insert into Employee (name, position, wage)
        values ($name, $pos, $wage);`, {$name: req.body.employee.name,
        $pos: req.body.employee.position,
        $wage: req.body.employee.wage}, function(err) {
        if (err) {
            return res.sendStatus(err);
        }
        db.get("select * from Employee where id = $id", {$id: this.lastID}, 
            (err, row) => {
                if (err) {
                    throw new Error(err);
                } else {
                    return res.status(201).send({employee: row});
                }
            });
    });
});

// update an employee
employeeRouter.put("/", validateEmployee, checkEmpID, (req, res, next) => {
    const empData = req.body.employee;
    db.serialize(() => {
        db.run(`update Employee set name = $name, position = $pos, wage = $wage 
        where id = $id`, {
            $name: empData.name, $pos: empData.position, $wage: empData.wage,
            $id: req.baseUrl.split("/")[3]
        }, (err) => {
            if (err) {
                return res.sendStatus(err);
            }
        });
        db.get("select * from Employee where id = $id;", 
            {$id: req.baseUrl.split("/")[3]}, (err, row) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send({employee: row});
                }
            });
    });
});

// delete an employee
employeeRouter.delete("/", checkEmpID, (req, res, next) => {
    const empID = req.baseUrl.split("/")[3];
    db.run("update Employee set is_current_employee = 0 where id = $id",
        {$id: empID}, err => {
            if (err) {
                return res.sendStatus(404);
            }
            db.get("select * from Employee where id = $id", {$id: empID}, 
                (err, row) => {
                    return res.status(200).send({employee: row});
                });
        });
});