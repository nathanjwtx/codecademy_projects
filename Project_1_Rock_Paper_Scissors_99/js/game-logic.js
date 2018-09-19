// All code should be written in this file.
let playerOneMoveOneType = undefined;
let playerOneMoveTwoType = undefined;
let playerOneMoveThreeType = undefined;
let playerOneMoveOneValue = undefined;
let playerOneMoveTwoValue = undefined;
let playerOneMoveThreeValue = undefined;

let playerTwoMoveOneValue = undefined;
let playerTwoMoveTwoValue = undefined;
let playerTwoMoveThreeValue = undefined;
let playerTwoMoveOneType = undefined;
let playerTwoMoveTwoType = undefined;
let playerTwoMoveThreeType = undefined;

const setPlayerMoves = ((player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
    const testValue = ((value) => {
        if (value >=1 && value <= 99) {
            return true;
        }
    });
    const testMove = ((move) => {
        if (move === 'rock' || move === 'paper' || move === 'scissors') {
            return true;
        }
    });
    const testSum = ((valueOne, valueTwo, valueThree) => {
        const valueSum = valueOne + valueTwo + valueThree;
        if (valueSum >= 1 && valueSum <= 99) {
            return true;
        }
    });

    switch (player) {
    case 'Player One':
        if (testValue(moveOneValue) && testValue(moveTwoValue) && testValue(moveThreeValue) && testSum(moveOneValue, moveTwoValue, moveThreeValue)
            && testMove(moveOneType) && testMove(moveTwoType) && testMove(moveThreeType)) {
            // console.log('passed');
            playerOneMoveOneValue = moveOneValue;
            playerOneMoveTwoValue = moveTwoValue;
            playerOneMoveThreeValue = moveThreeValue;
            playerOneMoveOneType = moveOneType;
            playerOneMoveTwoType = moveTwoType;
            playerOneMoveThreeType = moveThreeType;
        }
        break;
    case 'Player Two':
        if (testValue(moveOneValue) && testValue(moveTwoValue) && testValue(moveThreeValue) && testSum(moveOneValue, moveTwoValue, moveThreeValue)
        && testMove(moveOneType) && testMove(moveTwoType) && testMove(moveThreeType)) {
            playerTwoMoveOneValue = moveOneValue;
            playerTwoMoveTwoValue = moveTwoValue;
            playerTwoMoveThreeValue = moveThreeValue;
            playerTwoMoveOneType = moveOneType;
            playerTwoMoveTwoType = moveTwoType;
            playerTwoMoveThreeType = moveThreeType;
        }
        break;
    }
});

const getRoundWinner = ((round) => {
    switch (round) {
    case 1:
        if (playerOneMoveOneType && playerTwoMoveOneType && playerOneMoveOneValue && playerTwoMoveOneValue) {
            if (playerOneMoveOneType === playerTwoMoveOneType) {
                if (playerOneMoveOneValue > playerTwoMoveOneValue) {
                    return 'Player One';
                } else if (playerOneMoveOneValue < playerTwoMoveOneValue) {
                    return 'Player Two';
                } else {
                    return 'Tie';
                }
            } else if (playerOneMoveOneType === 'rock') {
                if (playerTwoMoveOneType === 'paper') {
                    return 'Player Two';
                } else if (playerTwoMoveOneType === 'scissors') {
                    return 'Player One';
                }
            } else if (playerOneMoveOneType === 'paper') {
                if (playerTwoMoveOneType === 'rock') {
                    return 'Player One';
                } else if (playerTwoMoveOneType === 'scissors') {
                    return 'Player Two';
                }
            } else if (playerOneMoveOneType === 'scissors') {
                if (playerTwoMoveOneType === 'paper') {
                    return 'Player One';
                } else if (playerTwoMoveOneType === 'rock') {
                    return 'Player Two';
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
        break;
    case 2:
        if (playerTwoMoveTwoValue && playerOneMoveTwoValue && playerOneMoveTwoType && playerTwoMoveTwoType) {
            if (playerOneMoveTwoType === playerTwoMoveTwoType) {
                if (playerOneMoveTwoValue > playerTwoMoveTwoValue) {
                    return 'Player One';
                } else if (playerOneMoveTwoValue < playerTwoMoveTwoValue) {
                    return 'Player Two';
                } else {
                    return 'Tie';
                }
            } else if (playerOneMoveTwoType === 'rock') {
                if (playerTwoMoveTwoType === 'paper') {
                    return 'Player Two';
                } else if (playerTwoMoveTwoType === 'scissors') {
                    return 'Player One';
                }
            } else if (playerOneMoveTwoType === 'paper') {
                if (playerTwoMoveTwoType === 'rock') {
                    return 'Player One';
                } else if (playerTwoMoveTwoType === 'scissors') {
                    return 'Player Two';
                }
            } else if (playerOneMoveTwoType === 'scissors') {
                if (playerTwoMoveTwoType === 'paper') {
                    return 'Player One';
                } else if (playerTwoMoveTwoType === 'rock') {
                    return 'Player Two';
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
        break;
    case 3:
        if (playerOneMoveThreeType && playerTwoMoveThreeType && playerOneMoveThreeValue && playerTwoMoveThreeValue) {
            if (playerOneMoveThreeType === playerTwoMoveThreeType) {
                if (playerOneMoveThreeValue > playerTwoMoveThreeValue) {
                    return 'Player One';
                } else if (playerOneMoveThreeValue < playerTwoMoveThreeValue) {
                    return 'Player Two';
                } else {
                    return 'Tie';
                }
            } else if (playerOneMoveThreeType === 'rock') {
                if (playerTwoMoveThreeType === 'paper') {
                    return 'Player Two';
                } else if (playerTwoMoveThreeType === 'scissors') {
                    return 'Player One';
                }
            } else if (playerOneMoveThreeType === 'paper') {
                if (playerTwoMoveThreeType === 'rock') {
                    return 'Player One';
                } else if (playerTwoMoveThreeType === 'scissors') {
                    return 'Player Two';
                }
            } else if (playerOneMoveThreeType === 'scissors') {
                if (playerTwoMoveThreeType === 'paper') {
                    return 'Player One';
                } else if (playerTwoMoveThreeType === 'rock') {
                    return 'Player Two';
                }
            } else {
                return null;
            }
            break;
        } else {
            return null;
        }
    default:
        return null;
    }
});

// Bonus section
const setComputerMoves = () => {
    let types = [];
    for (let i = 0; i < 3; i++) {
        switch (Math.floor(Math.random() * 3) + 1) {
        case 1:
            types[i] = 'rock';
            break;
        case 2:
            types[i] = 'paper';
            break;
        case 3:
            types[i] = 'scissors';
            break;
        }
    }
    playerTwoMoveOneType = types[0];
    playerTwoMoveTwoType = types[1];
    playerTwoMoveThreeType = types[2];

    playerTwoMoveOneValue = Math.floor(Math.random() * 99) + 1;
    playerTwoMoveTwoValue = Math.floor(Math.random() * (99 - playerTwoMoveOneValue)) + 1;
    playerTwoMoveThreeValue = 99 - (playerTwoMoveOneValue + playerTwoMoveTwoValue);

};

const getGameWinner = () => {
    let p1 = 0;
    let p2 = 0;
    let tie = 0;
    for (let i = 1; i < 4; i++) {
        if (getRoundWinner(i) === null) {
            return null;
        } else if (getRoundWinner(i) === 'Player One') {
            p1++;
        } else if (getRoundWinner(i) === 'Player Two') {
            p2++;
        } else {
            tie++;
        }
    }
    if (p1 > p2 && p1 >> tie) {
        return 'Player One';
    } else if (p2 > p1 && p2 > tie) {
        return 'Player Two';
    } else {
        return 'Tie';
    }
};
