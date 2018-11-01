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

menuRouter.use(getParams, checkMenuId, checkData);

// get all or specific menu
menuRouter.get("/", (req, res, next) => {
    if (res.locals.menuID !== undefined) {
        db.get("select * from menu where id = $id;", {$id: res.locals.menuID},
            (err, row) => {
                if (err) {
                    return res.sendStatus(404);
                } else {
                    return res.status(200).send({menu: row});
                }
            });
    } else if (res.locals.menuID === undefined) {
        db.all("select * from menu;", (err, rows) => {
            if (err) {
                return res.sendStatus(400);
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
                db.get("select * from menu where id = $id;", {$id: this.lastID},
                    (err, row) => {
                        if (err) {
                            res.sendStatus(400);
                        } else {
                            res.status(201).send({menu: row});
                        }
                    })
            }
        });
});

// update a menu
menuRouter.put("/", (req, res, next) => {
    console.log(res.locals.row);
});