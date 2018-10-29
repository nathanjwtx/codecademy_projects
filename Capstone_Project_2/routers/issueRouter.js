const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");

const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
const app = express();
const issueRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(express.static("./public"));

module.exports = issueRouter;

// validate required info
let validateSeries = (req, res, next) => {
    const seriesData = req.body.series;
    if (!seriesData.name || !seriesData.description) {
        /* don't use return below so that the error is passed back to the .post router
        the error then gets handed by function (err)
        */
        res.status(400).send(); 
    }
    next();
};

// get all issues
issueRouter.get("/", (req, res, next) => {
    let splitURL = req.baseUrl.split("/");
    console.log(splitURL);
    if (splitURL[3] && !splitURL[5]) {
        db.serialize(() => {
            db.all("select count(*) from series where id = $id",
                {$id: splitURL[3]}, (err, row) => {
                    if (!err) {
                        db.all("select * from issue where series_id = $id;", 
                            {$id: splitURL[3]}, (err, rows) => {
                                if (err) {
                                    res.status(404).send(err);
                                } else {
                                    // console.log(rows);
                                    if (rows.length === 0) {
                                        // console.log("err");
                                        return res.sendStatus(404);
                                    } else {
                                        // console.log(rows.length);
                                        // console.log("hmm");
                                        return res.status(200).send({issues: rows});
                                    }
                                }
                            });
                    } else {
                        res.status(404).send(err);
                    }
                });

        });
    } else if (splitURL[5]) {
        db.get("select * from issue where id = $id;", 
            {$id: splitURL[5]}, (err, row) => {
                if (err) {
                    throw new Error(err);
                } else if (row) {
                    // console.log(row);
                    return res.status(200).send({issue: row});
                } else {
                    return res.status(404).send();
                }
            });
    } else {
        return res.status(404).send("Error");
    }
});

issueRouter.post("/", (req, res, next) => {
    
});