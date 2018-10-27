const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");

// create Artist table
db.run(`create table Artist (
    id integer primary key,
    name text not null,
    date_of_birth text not null,
    biography text not null,
    is_currently_employed integer "1"
);`, err => {
    if (err) {
        console.error(err);
        
    }
});

// create Series table
db.run(`create table Series (
    id integer primary key,
    name text not null,
    description text not null
)`, err => {
    if (err) {
        throw new Error(err);
    }
});

// create Issue table
db.run(`create table Issue (
    id integer primary key,
    name text not null,
    issue_number text not null,
    publication_date text not null,
    artist_id integer not null,
    series_id integer not null
)`, err => {
    if (err) {
        throw new Error(err);
    }
});