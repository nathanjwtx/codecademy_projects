const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(process.env.TEST_DATABASE || "./database.sqlite");

db.run("DROP TABLE IF EXISTS Employee", err => {
    if (err) {
        throw new Error(err);
    }
    db.run(`create table Employee (
        id integer PRIMARY KEY,
        name text NOT NULL,
        position text NOT NULL,
        wage integer NOT NULL,
        is_current_employee integer DEFAULT "1"
    )`, err => {
        if (err) {
            throw new Error(err);
        }
    });
});

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS Timesheet", err => {
        if (err) {
            throw new Error(err);
        }
    });
    db.run(`create table Timesheet (id integer PRIMARY KEY,
        hours integer NOT NULL,
        rate integer NOT NULL,
        date integer NOT NULL,
        employee_id integer NOT NULL, FOREIGN KEY (employee_id) REFERENCES Employee (id))`,
    err => {
        if (err) {
            throw new Error(err);
        }
    });
});

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS Menu", err => {
        if (err) {
            throw new Error(err);
        }
    });
    db.run(`create table Menu (
        id integer PRIMARY KEY,
        title text NOT NULL
    )`, err => {
        if (err) {
            throw new Error(err);
        }
    });
});

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS MenuItem", err => {
        if (err) {
            throw new Error(err);
        }
    });
    db.run(`create table MenuItem (
        id integer PRIMARY KEY,
        name text NOT NULL,
        dscription text,
        inventory integer NOT NULL,
        price integer NOT NULL,
        menu_id integer NOT NULL, FOREIGN KEY (menu_id) REFERENCES Menu(id)
    )`, err => {
        if (err) {
            throw new Error(err);
        }
    }) ;
});