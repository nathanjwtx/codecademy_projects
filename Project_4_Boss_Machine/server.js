const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const db = require("./server/db");

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// find the index based on id
function getIndex(myObject, Id) {
    let index;
    for (let i = 0; i < myObject.length; i++) {
        if (myObject[i].id === Id) {
            index = i;
            break;
        }
    }
    return index;
}

app.use(bodyparser.json());

// Add middleware for handling CORS requests from index.html


// Add middware for parsing request bodies here:
const Types = ["minions", "ideas", "meetings"];
let type;

app.param(["type", "typeId"], (req, res, next, id) => {
    // console.log("Param:", id);
    const path = req.path.split("/");
    // console.log(path);
    const typeIndex = Types.indexOf(id);
    if (typeIndex > -1) {
        req.type = id;
        // type = req.path;
    }
    if (path[3]) {
        req.typeId = path[3];
    }
    next();
});

app.get("/api/:type", (req, res, next) => {
    // console.log(Types[req.type]);
    res.status(200).send(db.getAllFromDatabase(req.type));
});


app.get("/api/:type/:typeId", (req, res, next) => {
    // console.log(req.path.split("/"));
    // console.log(req.typeId);
    const types = db.getAllFromDatabase(req.type);
    const idIndex = getIndex(types, req.typeId);
    // console.log(types);
    if (idIndex !== undefined) {
        res.status(200).send(types[idIndex]);
    } else {
        res.status(404).send();
    }
});

app.put("/api/:type/:typeId", (req, res, next) => {
    const id = req.body.id;
    const typeDb = db.getAllFromDatabase(req.type);
    const idIndex = getIndex(typeDb, id);
    if (idIndex !== undefined) {
        res.status(200).send(db.updateInstanceInDatabase(req.type, req.body));
    } else {
        res.status(404).send();
    }
});

app.post("/api/:type", (req, res, next) => {
    const typeDb = db.getAllFromDatabase(req.type);
    const newObj = {};
    if (req.type === "minions" && typeof(req.body.name) === "string"  && 
        typeof(req.body.title) === "string" && typeof(req.body.weaknesses) === "string"
        && typeof(req.body.salary) === "number") {
        newObj.name = req.body.name;
        newObj.id = typeDb.length + 1;
        newObj.salary = req.body.salary;
        newObj.weaknesses = req.body.weaknesses;
        newObj.title = req.body.title;
    } else if (req.type === "ideas" && typeof(req.body.name) === "string" &&
        typeof(req.body.description) === "string" && typeof(req.body.numWeeks) === "number"
        && typeof(req.body.weeklyRevenue) === "number") {
        newObj.name = req.body.name;
        newObj.description = req.body.description;
        newObj.numWeeks = req.body.numWeeks;
        newObj.weeklyRevenue = req.body.weeklyRevenue;
        newObj.id = typeDb.length + 1;
    }
    res.status(201).send(newObj);
});

// app.delete("/api/minions", (req, res, next) => {

// });

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require("./server/api");


// This conditional is here for testing purposes:
if (!module.parent) { 
    // Add your code to start the server listening at PORT below:
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}

