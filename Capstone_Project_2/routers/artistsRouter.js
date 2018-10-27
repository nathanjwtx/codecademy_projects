const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");

const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");
const app = express();
const artistRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("tiny"));
app.use(express.static("./public"));

module.exports = artistRouter;

// get all artists
artistRouter.get("/", (req, res, next) => {
    let splitURL = req.baseUrl.split("/");
    if (!splitURL[3]) {
        db.all("select * from artist where is_currently_employed = 1;", (err, rows) => {
            if (err) {
                throw new Error(err);
            } else {
                return res.status(200).send({artists: rows});
            }
        });
    } else if (splitURL[3]) {
        db.get("select * from artist where id = $id;", 
            {$id: splitURL[3]}, (err, row) => {
                if (err) {
                    throw new Error(err);
                } else if (row) {
                    return res.status(200).send({artist: row})
                } else {
                    return res.status(404).send();
                }
            });
    } else {
        return res.status(404).send();
    }
});

let validateArtist = (req, res, next) => {
    const artistData = req.body.artist;
    console.log(artistData);
    if (!artistData.name || !artistData.dateOfBirth || !artistData.biography) {
        /* don't use return below so that the error is passed back to the .post router
        the error then gets handed by function (err)
        */
        res.status(400).send(); 
    }
    next();
};

artistRouter.post("/", validateArtist, (req, res, next) => {
    const artistData = req.body.artist;
    db.run(`insert into Artist (name, date_Of_Birth, biography, is_Currently_Employed)
    values ($name, $dob, $bio, $emp);`, {
        $name: artistData.name,
        $dob: artistData.dateOfBirth,
        $bio: artistData.biography,
        $emp: 1
    }, function (err) {
        if (err) {
            // throw new Error(err);
            return res.status(400).send(err);
        } else {
            let rowID = this.lastID;
            db.get("select * from Artist where id = $id", {$id: rowID}, 
                (err, row) => {
                    if (err){
                        res.sendStatus(400);
                    } else {
                        res.status(201).send({artist: row});
                    }
                });
        }
    });
});