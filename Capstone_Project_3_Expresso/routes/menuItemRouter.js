const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");

const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
db.get("PRAGMA foreign_keys = ON");
const app = express();
const menuItemRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("short"));
app.use(express.static("./public"));

module.exports = menuItemRouter;

function getParams (req, res, next) {
    res.locals.menuID = req.baseUrl.split("/")[3];
    res.locals.menuItemID = req.baseUrl.split("/")[5];
    next();
}

let getMenuItem = (menu, id = 0) => new Promise ((resolve, reject) => {
    let sql;
    let args;
    if (id > 0) {
        sql = "select * from menuitem where id = $id and menu_id = $menu";
        args = {$id: id, $menu: menu};
    } else {
        sql = "select * from menuitem where menu_id = $menu";
        args = {$menu: menu};
    }
    db.all(sql, args, (err, row) => {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
    });
});

menuItemRouter.use(getParams);

// return menu items
menuItemRouter.get("/", (req, res, next) => {
    if (!res.locals.menuItemID) {
        getMenuItem(res.locals.menuID)
            .then((data) => {
                return res.status(200).send({"menuItems": data});
            }, (err) => {
                return res.status(400).send("Something went wrong");
            });
    } else if (res.locals.menuItemID) {
        getMenuItem(res.locals.menuID, res.locals.menuItemID)
            .then((data) => {
                return res.status(200).send({"menuItem": data});
            }, (err) => {
                return res.status(400).send("Something went wrong");
            });
    }
});

// create a new menu item
