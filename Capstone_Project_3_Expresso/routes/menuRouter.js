const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");

const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
db.get("PRAGMA foreign_keys = ON");
const app = express();
const menuRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("short"));
app.use(express.static("./public"));

module.exports = menuRouter;

function getParams (req, res, next) {
    res.locals.menuID = req.baseUrl.split("/")[3];
    next();
}

function checkMenuId (req, res, next) {
    if (res.locals.menuID !== undefined) {
        db.get("select * from menu where id = $id;", {$id: res.locals.menuID},
            (err, row) => {
                if (err || row === undefined) {
                    res.sendStatus(404);
                } else {
                    res.locals.row = row;
                    next();
                }
            });
    } else {
        next();
    }
}

function checkData (req, res, next) {
    if (req.method === "POST") {
        let menuData = req.body.menu;
        if (!menuData.title) {
            res.sendStatus(400);
        } else {
            next();
        }
    } else {
        next();
    }
}

let getRow = (id) => new Promise ((resolve, reject) => {
    let sql = "select * from menu where id = $id";
    db.get(sql, {$id: id}, (err, row) => {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
    });
});

menuRouter.use(getParams, checkMenuId, checkData);

// get all or specific menu
menuRouter.get("/", (req, res, next) => {
    if (res.locals.menuID !== undefined) {
        getRow(res.locals.menuID)
            .then((data) => {
                res.status(200).send({menu: data});
            }, (err) => {
                res.status(404).send(err);
            });
    } else if (res.locals.menuID === undefined) {
        db.all("select * from menu;", (err, rows) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                return res.status(200).send({menus: rows});
            }
        });
    }
});

// create new menu
menuRouter.post("/", (req, res, next) => {
    db.run("insert into menu (title) values ($title);", {$title: req.body.menu.title},
        function (err) {
            if (err) {
                res.sendStatus(400);
            } else {
                getRow(this.lastID)
                    .then((data) => {res.status(201).send({menu: data});
                    }, (err) => {
                        return res.status(404).send(err);
                    });
            }
        });
});

// update a menu
menuRouter.put("/", (req, res, next) => {
    const sql = "update menu set title = $title where id = $id";
    db.run(sql, {$title: req.body.menu.title, $id: res.locals.menuID},
        (err) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                getRow(4).then((data) => {
                    return res.status(200).send(data);
                }, (err) => {
                    return res.status(400).send(err);
                });
            }
        });
});