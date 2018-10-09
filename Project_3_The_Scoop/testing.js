const fs = require("fs");

function loadDatabase() {
    let savedData;
    if (fs.existsSync("database")) {
        console.log("loading");
        savedData = fs.readFileSync("database", (err, data) => {
            if (err) {
                console.log(err);
            }
            // console.log(data);
            return data;
        });
    } else {
        console.log("Error");
    }
    console.log(savedData);
    // fs.existsSync("database", (e) => {
    //     if (e) {
    //         console.log("loading");
    //         let data = fs.readFileSync("database", {flag:"r+"});
    //         console.log(useYAML.safeLoad(data));
    //         return useYAML.safeLoad(data);
    //     }
    // });
    // console.log(fs.existsSync("database"));
}

loadDatabase();