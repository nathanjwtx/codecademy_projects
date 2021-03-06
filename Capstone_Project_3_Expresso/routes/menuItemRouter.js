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
    if (req.baseUrl.split("/")[4] === "menu-items") {
        res.locals.menuItems = true;
    } else {
        res.locals.menuItems = false;
    }
    next();
}

function checkData (req, res, next) {
    let itemData = req.body.menuItem;
    console.log(itemData);
    if (!itemData.name || !itemData.inventory || !itemData.price) {
        res.status(400).send("Missing data");
    }
    next();
}

let getMenuItem = (menu, id = 0, allItems = false) => new Promise ((resolve, reject) => {
    let sql;
    let args;
    if (id > 0) {
        sql = "select * from menuitem where id = $id and menu_id = $menu";
        args = {$id: id, $menu: menu};
    } else if (allItems) {
        sql = "select * from menuitem where menu_id = $menu";
        args = {$menu: menu};
    } else {
        sql = "select * from menu where id = $menuID";
        args = {$menuID: menu};
    }
    db.all(sql, args, (err, row) => {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
    });
});

let getMenuCount = (menu) => new Promise ((resolve, reject) => {
    db.get("select count(*) as count from menu where id = $id", {$id: menu},
        (err, row) => {
            if (row) {
                resolve(row);
            }
            reject(err);
        });
});

menuItemRouter.use(getParams);

// return menu items
menuItemRouter.get("/", (req, res, next) => {
    // return all menu items
    getMenuCount(res.locals.menuID)
        .then((menuCount) => {
            if (menuCount.count === 0) {
                throw new Error();
            } else {
                getMenuItem(res.locals.menuID, res.locals.menuItemID, true)
                    .then((menuItems) => {
                        return res.status(200).send({"menuItems": menuItems});
                    }).catch((err) => {
                        return res.status(404).send("Something went wrong");
                    });
            }
        }).catch((err) => {
            return res.status(404).send("1 - Something went wrong");
        });
});

// create a new menu item
menuItemRouter.post("/", checkData, (req, res, next) => {
    getMenuCount(res.locals.menuID)
        .then((menuCount) => {
            console.log(menuCount)
            if (menuCount.count === 0) {
                throw new Error();
            } else {
                let sql = `insert into menuitem (name, description, inventory, 
                    price, menu_id) values ($name, $desc, $inv, $price, $menu);`;
                let args = {$name: req.body.menuItem.name,
                    $desc: req.body.menuItem.description,
                    $inv: req.body.menuItem.inventory,
                    $price: req.body.menuItem.price,
                    $menu: res.locals.menuID};
                db.run(sql, args, function (err) {
                    if (!err) {
                        getMenuItem(res.locals.menuID, this.lastID)
                            .then((menuItem) => {
                                res.status(201).send({"menuItem": menuItem[0]});
                            }, err => {
                                throw new Error();
                            }).catch ((err) => {
                                console.error("400 - missing data");
                            });
                    }
                });
            }
        }).catch((err) => {
            return res.status(404).send("POST - Something went wrong");
        });
});

// edit an existing item
menuItemRouter.put("/", (req, res, next) => {
    getMenuItem(res.locals.menuID, res.locals.menuItemID)
        .then((menuItem) => {
            console.log("Menu", menuItem[0]);
            if (menuItem[0] !== undefined) {
                let itemData = req.body.menuItem;
                if (itemData.name && itemData.inventory && itemData.price) {
                    let sql = `update menuitem set name = $name, description = $desc,
                    inventory = $inv, price = $price, menu_id = $menu where id = $id;`;
                    let args = {$name: req.body.menuItem.name,
                        $desc: req.body.menuItem.description,
                        $inv: req.body.menuItem.inventory,
                        $price: req.body.menuItem.price,
                        $menu: res.locals.menuID,
                        $id: res.locals.menuItemID};
                    db.run(sql, args, function (err) {
                        if (!err) {
                            // console.log("no error");
                            getMenuItem(res.locals.menuID, res.locals.menuItemID)
                                .then((menuItem) => {
                                    return res.status(200).send({"menuItem": menuItem[0]});
                                }, err => {
                                    console.log(err);
                                }).catch ((err) => {
                                    return res.status(404).send("1 PUT - Something went wrong");
                                });
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    return res.status(400).send("PUT - missing data");
                }
            } else {
                return res.status(404).send("2 PUT - Something went wrong");
            }
        }, err => {
            console.log(err);
        }).catch(err => {
            return res.status(404).send("3 PUT - Something went wrong");
        });
});

// delete menu item
menuItemRouter.delete("/", (req, res, next) => {
    getMenuItem(res.locals.menuID, res.locals.menuItemID)
        .then(menuItem => {
            if (menuItem[0] !== undefined) {
                db.run("delete from menuitem where id = $id;", {$id: res.locals.menuItemID},
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                return res.status(204).send();
            } else {
                throw new Error();
            }
        }).catch(err => {
            return res.status(404).send("Wrong menu or item ID");
        });
});