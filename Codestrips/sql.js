const sqlite = require("sqlite3");

const db = new sqlite.Database("./db.sqlite");
db.run("drop table if exists Strip", (err) => {
    if (err) {
        console.error(err);
    }
    db.run(`create table Strip (
        id integer primary key,
        head text not null,
        body text not null,
        background text not null,
        bubble_type text not null,
        bubble_text text default "" not null,
        caption text default "" not null
    );`, err => {
        if (err) {
            console.error(err);
        }
    });
});