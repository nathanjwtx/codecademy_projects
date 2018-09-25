let kicks = Array(16).fill(false);
let snares = Array(16).fill(false);
let hiHats = Array(16).fill(false);
let rideCymbals = Array(16).fill(false);

const toggleDrum = (type, id) => {
    if (type === "kicks" || type === "snares" || type === "hiHats" 
        || type === "rideCymbals") {
        if (id >= 0 && id < 16) {
            switch (type) {
            case "kicks":
                kicks[id] = toggleHelper(kicks, id);
                break;
            case "snares":
                snares[id] = toggleHelper(snares, id);
                break;
            case "hiHats":
                hiHats[id] = toggleHelper(hiHats, id);
                break;
            case "rideCymbals":
                rideCymbals[id] = toggleHelper(rideCymbals, id);
            }
        }
    }
};

const toggleHelper = (type, id) => {
    return type[id] === false ? true : false;
};

const clear = (type) => {
    switch (type) {
    case "kicks":
        kicks = Array(16).fill(false);
        break;
    case "snares":
        snares = Array(16).fill(false);
        break;
    case "hiHats":
        hiHats = Array(16).fill(false);
        break;
    case "rideCymbals":
        rideCymbals = Array(16).fill(false);
        break;
    }
};

const invert = (type) => {
    switch (type) {
    case "kicks":
        for (let i = 0; i < 16; i++) kicks[i] = toggleHelper(kicks, i);
        break;
    case "snares":
        for (let i = 0; i < 16; i++) snares[i] = toggleHelper(snares, i);
        break;
    case "hiHats":
        for (let i = 0; i < 16; i++) hiHats[i] = toggleHelper(hiHats, i);
        break;
    case "rideCymbals":
        for (let i = 0; i < 16; i++) rideCymbals[i] = toggleHelper(rideCymbals, i);
        break;
    }
};

const getNeighborPads = (x, y, size) => {
    if (x < 0 || x >= size || y < 0 || y >= size || size < 0) {
        return [];
    }
    const result = [];
    for (let i = 0; i < 4; i++) {
        if (neighborHelper(x, y, size, i) !== undefined) {
            result.push(neighborHelper(x, y, size, i));
        }
    }
    return result;
};

const neighborHelper = (x, y, size, pos) => {
    switch (pos) {
    case 0:
        return y + 1 >= size ? undefined : [x, y + 1];
    case 1:
        return x + 1 >= size ? undefined : [x + 1, y];
    case 2:
        return y - 1 < 0 ? undefined : [x, y - 1];
    case 3:
        return x - 1 < 0 ? undefined : [x - 1, y];
    }
};
