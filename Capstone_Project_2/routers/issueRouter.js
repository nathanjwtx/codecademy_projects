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
let validateIssue = (req, res, next) => {
    const issueData = req.body.issue;
    // console.log(issueData);
    if (!issueData.name || !issueData.issueNumber || !issueData.publicationDate
        || !issueData.artistId) {
        /* don't use return below so that the error is passed back to the .post router
        the error then gets handed by function (err)
        */
        if (req.method === "POST") {
            return res.status(400).send(); 
        } else if (req.method === "PUT" && req.baseUrl.split("/")[5]) {
            db.get("select * from Issue where id = $id;", 
                {$id: req.baseUrl.split("/")[5]}, (err, row) => {
                    if (row === undefined) {
                        // error when id doesn't exist
                        res.status(404).send();
                    }
                });
        }
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
                                    return res.status(404).send(err);
                                } else {
                                    // console.log(rows);
                                    if (rows.length === 0) {
                                        // console.log("err");
                                        return res.status(404).send({issues: []});
                                    } else {
                                        // console.log(rows.length);
                                        // console.log("hmm");
                                        return res.status(200).send({issues: rows});
                                    }
                                }
                            });
                    } else {
                        return res.status(404).send([]);
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

issueRouter.post("/", validateIssue, (req, res, next) => {
    const issueData = req.body.issue;
    // console.log(req.body.issue.name);
    const splitURL = req.baseUrl.split("/");
    const seriesID = splitURL[3];
    db.run(`insert into issue (name, issue_number, publication_date,
        artist_id, series_id) values ($name, $iss, $pub, $art, $series);`,
    {$name: issueData.name, $iss: issueData.issueNumber, $pub: issueData.publicationDate,
        $art: issueData.artistId, $series: seriesID}, (err) => {
        if (err) {
            // console.log(err);
            return res.status(404).send(err);
        } else {
            // res.status(200).send("Success");
            db.get("select * from issue where issue_number = $issue and series_id = $series", 
                {$issue: issueData.issueNumber, $series: seriesID}, (err, row) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(404);
                    } else {
                        console.log(row);
                        return res.status(201).send({issue: row});
                    }
                });
        }
    });
});

// delete an issue
issueRouter.delete("/", (req, res, next) => {
    const issueID = req.baseUrl.split("/")[5];
    console.log(issueID);
    if (issueID === undefined) {
        return res.sendStatus(404);
    } else {
        db.get("select * from Issue where id = $id;", {$id: issueID}, 
            (err,rowCheck) => {
                if (err || rowCheck === undefined) {
                    return res.sendStatus(404);
                } else {
                    db.run("delete from issue where id = $id;", {$id: issueID}, 
                        (err) => {
                            if (err) {
                                return res.sendStatus(404);
                            } else {
                                return res.sendStatus(204);
                            }
                        });
                }
            });
    }
});

// update an issue
issueRouter.put("/", validateIssue, (req, res, next) => {
    const issueID = req.baseUrl.split("/")[5];
    const issueData = req.body.issue;
    db.run(`update Issue set name = $name, issue_number = $issue, 
        publication_date = $pub, artist_id = $art, series_id = $series
        where id = $issId;`,
    {
        $name: issueData.name,
        $issId: issueID,
        $issue: issueData.issueNumber,
        $pub: issueData.publicationDate,
        $art: issueData.artistId,
        $series: req.baseUrl.split("/")[3]
    }, function (err) {
        if (err) {
            // error 400 when invalid issue update or artist id doesn't exist
            return res.sendStatus(400);
        } else {
            db.get("select * from Issue where id = $id;", {$id: issueID},
                (err, row) => {
                    if (err) {
                        return res.sendStatus(400);
                    } else {
                        return res.status(200).send({issue: row});
                    }
                });
        }
    });
});