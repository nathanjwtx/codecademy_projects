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

module.exports = app;

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
    const head = req.body.strip.head;
    const body = req.body.strip.body;
    const bubble = req.body.strip.bubbleType;
    const bkgrnd = req.body.strip.background;
    const bubtxt = req.body.strip.bubbleText;
    const cap = req.body.strip.caption;

    db.run(`insert into Strip (head, body, bubble_type, background, bubble_text, 
        caption) values ($head, $body, $bubble, $bkgrnd, $bubtxt, $cap);`, 
    {$head: head,
        $body: body,
        $bubble: bubble,
        $bkgrnd: bkgrnd,
        $bubtxt: bubtxt,
        $cap: cap}, 
    (err) => {
        if (err) {
            console.error(err);
        } else {
            res.status(204).send();
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});