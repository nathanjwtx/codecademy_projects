const express = require("express");
const bp = require("body-parser");
const morgan = require("morgan");
const sqlite = require("sqlite3");
const app = express();

const db = new sqlite.Database(process.env.TEST_DATABASE || "db.sqlite");

// const PORT = process.env.PORT || 4001;
const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.get("/strips", (req, res, next) => {
    db.all("select * from Strip;", (err, rows) => {
        if (err) {
            throw Error;
        } else {
            res.status(200).send({strips: rows});
        }
    });
});

app.post("/strips", (req, res, next) => {
    /* could have split out the validation into a seperate function and called
    it as app.post("/strips", validationFunction...) */
    const head = req.body.strip.head;
    const body = req.body.strip.body;
    const bubble = req.body.strip.bubbleType;
    const bkgrnd = req.body.strip.background;
    const bubtxt = req.body.strip.bubbleText;
    const cap = req.body.strip.caption;

    if (head && body && bubble && bkgrnd) {
        db.run(`insert into Strip (head, body, bubble_type, background, bubble_text, 
            caption) values ($head, $body, $bubble, $bkgrnd, $bubtxt, $cap);`, 
        {$head: head,
            $body: body,
            $bubble: bubble,
            $bkgrnd: bkgrnd,
            $bubtxt: bubtxt,
            $cap: cap}, 
        function (err) {
            const rowID = this.lastID;
            if (err) {
                res.status(500).send();
            } else {
                db.get("select * from Strip where id = $id;", 
                    {$id: rowID},
                    (err, row) => {
                        if (err) {
                            res.status(500).send();
                        } else {
                            let result = {};
                            result.strip = row;
                            // combine the above 2 rows to {strip: row} inside
                            // send(..)
                            res.status(201).send(result);
                        }
                    });
            }
        });
    } else {
        res.status(400).send();
    }
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

module.exports = app;