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
    // if (!playerOneMoveOneType || !playerOneMoveOneValue || !playerOneMoveTwoType || !playerOneMoveTwoValue || !playerOneMoveThreeType || !playerOneMoveThreeValue
    //     || !playerTwoMoveOneType || !playerTwoMoveOneValue || !playerTwoMoveTwoType || !playerTwoMoveTwoValue || !playerTwoMoveThreeType || !playerTwoMoveThreeValue) {
    //         console.log('fail');
    //     return null;
    // }
    switch (round) {
    case 1:
        if (playerOneMoveOneType && playerTwoMoveOneType && playerOneMoveOneValue && playerTwoMoveOneValue && playerOneMoveOneType === playerTwoMoveOneType) {
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
        break;
    case 2:
        if (playerOneMoveTwoType && playerTwoMoveTwoType && playerOneMoveTwoType === playerTwoMoveTwoType) {
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
        break;
    case 3:
        if (playerOneMoveThreeType && playerTwoMoveThreeType && playerOneMoveThreeType === playerTwoMoveThreeType) {
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
    default:
        return null;
    }
});

// setPlayerMoves('Player One', undefined, 11, 'paper', 33, 'scissors', 44);


