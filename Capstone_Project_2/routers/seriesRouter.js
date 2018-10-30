const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");

const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
const app = express();
const seriesRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("short"));
app.use(express.static("./public"));

module.exports = seriesRouter;

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

// get all series
seriesRouter.get("/", (req, res, next) => {
    let splitURL = req.baseUrl.split("/");
    if (!splitURL[3]) {
        db.all("select * from series;", (err, rows) => {
            if (err) {
                throw new Error(err);
            } else {
                return res.status(200).send({series: rows});
            }
        });
    } else if (splitURL[3]) {
        db.get("select * from series where id = $id;", 
            {$id: splitURL[3]}, (err, row) => {
                if (err) {
                    throw new Error(err);
                } else if (row) {
                    return res.status(200).send({series: row});
                } else {
                    return res.status(404).send("Error");
                }
            });
    } else {
        return res.status(404).send("Grr");
    }
});

// create a new series
seriesRouter.post("/", validateSeries, (req, res, next) => {
    const seriesData = req.body.series;
    db.run(`insert into Series (name, description)
    values ($name, $description);`, {
        $name: seriesData.name,
        $description: seriesData.description 
    }, function (err) {
        if (err) {
            // throw new Error(err);
            return res.status(400).send(err);
        } else {
            let rowID = this.lastID;
            db.get("select * from Series where id = $id", {$id: rowID}, 
                (err, row) => {
                    if (err){
                        res.sendStatus(400);
                    } else {
                        res.status(201).send({series: row});
                    }
                });
        }
    });
});

// update series
seriesRouter.put("/", validateSeries, (req, res, next) => {
    const seriesData = req.body.series;
    let rowID = req.baseUrl.split("/")[3];
    console.log(seriesData);
    db.run(`update Series 
    set name = $name, description = $description where id = $id;`, 
    {
        $id: rowID,
        $name: seriesData.name,
        $description: seriesData.description}, function(err) {
        if (err) {
            return res.sendStatus(400);
        } else {
            db.get("select * from Series where id = $id", 
                {$id: rowID},
                (err, row) => {
                    if (err) {
                        return res.sendStatus(400);
                    } else {
                        return res.status(200).send({series: row});
                    }
                });
        }
    });
});

// delete series
seriesRouter.delete("/", (req, res, next) => {
    const seriesID = req.baseUrl.split("/");
    console.log("ID", seriesID);
    db.serialize(() => {
        db.get(`select series.name, count(*) as count from series join issue
            on series.id = issue.series_id where series.id = $series;`,
        {$series: seriesID[3]}, (err, row) => {
            console.log(row);
            if (!row.name) {
            //     console.error(err);
                db.run("delete from series where id = $series", 
                    {$series: seriesID[3]}, (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            return res.status(204).send("Removed");
                        }
                    });
            } else if (row.count === 0) {
                console.log(row);
                return res.status(404).send("Gulp");
            } else if (row.count > 0) {
                return res.status(400).send("Issues present");
            }
        });
    });
});