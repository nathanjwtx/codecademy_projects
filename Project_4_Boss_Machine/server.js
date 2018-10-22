const express = require('express');
const app = express();

const db = require("./server/db");

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html


// Add middware for parsing request bodies here:
app.get("/api/minions", (req, res, next) => {
    res.status(200).send(db.getAllFromDatabase("minions"));
});

app.get("/api/minions/:minionId", (req, res, next) => {
    const minions = db.getAllFromDatabase("minions");
    let index;
    for (let i = 0; i < minions.length; i++) {
        if (minions[i].id === req.params.minionId) {
            index = i;
            break;
        }
    }
    if (index !== undefined) {
        res.status(200).send(minions[index]);
    } else {
        res.status(404).send();
    }
});


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    });
}

