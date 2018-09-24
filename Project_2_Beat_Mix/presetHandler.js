// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (request, index, newArray = []) => {
    // console.log(request);
    if (request !== "GET" && request !== "PUT") {
        return [400];
    }
    if (index < 0 || index > 3 || presets[index] === []) {
        return [404];
    }
    if (request === "PUT") {
        presets[index] = newArray;
    }
    return [200, presets[index]];
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;

// console.log(presetHandler("GET", 3));