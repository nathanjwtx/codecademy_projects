const team = {
    _players: [{firstName: "Fred", lastName: "Flintstone", age: 35},
        {firstName: "Barney", lastName: "Rubble", age: 34},
        {firstName: "Wilma", lastName: "Flintstone", age: 30}],
    _games: [{opponent: "Angels", teamPoints: 13, opponentPoints: 11},
        {opponent: "Rays", teamPoints: 8, opponentPoints: 10},
        {opponent: "Yankees", teamPoints: 9, opponentPoints: 2}],
    get players() {
        // let temp = this._players[0];
        // return Object.keys(temp);
        return this._players;
    },
    get games() {
        // let temp = this._games[0];
        // return Object.keys(temp);
        return this._games;
    },
    addPlayer(firstName, lastName, age) {
        const newPlayer = {
            firstName,
            lastName,
            age
        };
        this._players.push(newPlayer);
    },
    addGame(opponent, teamPoints, opponentPoints) {
        const newGame = {
            opponent,
            teamPoints,
            opponentPoints
        };
        this._games.push(newGame);
    }
};

team.addPlayer("Steph", "Curry", 28);
team.addPlayer("Lisa", "Leslie", 44);
team.addPlayer("Bugs", "Bunny", 76);
team.addGame("Astros", 8, 7);
team.addGame("Red Sox", 3, 7);
team.addGame("Cubs", 14, 2);
console.log(team.players);
console.log(team.games);