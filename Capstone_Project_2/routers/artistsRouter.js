const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");

const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
const app = express();
const artistRouter = express.Router();
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(morgan("tiny"));
// app.use(express.static("./public"));

module.exports = artistRouter;

// get all artists
artistRouter.get("/", (req, res, next) => {
    let splitURL = req.baseUrl.split("/");
    if (!splitURL[3]) {
        db.all("select * from artist;", (err, rows) => {
            if (err) {
                throw new Error(err);
            } else {
                console.log(rows);
            }
        });
    } else if (splitURL[3]) {
        db.get("select * from artist where id = $id;", 
            {$id: splitURL[3]}, (err, row) => {
                if (err) {
                    throw new Error(err);
                } else {
                    console.log(row);
                }
            });
    }
});