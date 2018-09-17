// All code should be written in this file.
let playerOneMoveOneType = undefined;
let playerOneMoveTwoType = undefined;
let playerOneMoveThreeType = undefined;
let playerTwoMoveOneType = undefined;
let playerTwoMoveTwoType = undefined;
let playerTwoMoveThreeType = undefined;

let playerOneMoveOneValue = undefined;
let playerOneMoveTwoValue = undefined;
let playerOneMoveThreeValue = undefined;
let playerTwoMoveOneValue = undefined;
let playerTwoMoveTwoValue = undefined;
let playerTwoMoveThreeValue = undefined;

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
    switch (player) {
    case 'Player One':
        if (testValue(moveOneValue) & testValue(moveTwoValue) & testValue(moveThreeValue) & moveOneValue + moveTwoValue + moveThreeValue <= 99 
            && moveOneValue + moveTwoValue + moveThreeValue < 1) {
            if (testValue(moveOneValue)) {
                playerOneMoveOneValue = moveOneValue;
            }
            if (testValue(moveTwoValue)) {
                playerOneMoveTwoValue = moveTwoValue;
            }
            if (testValue(moveThreeValue)) {
                playerOneMoveThreeValue = moveThreeValue;
            }
        }
        if (testMove(playerOneMoveOneType) && testMove(playerOneMoveTwoType) && testMove(playerOneMoveThreeType)) {
            playerOneMoveOneType = moveOneType;
            playerOneMoveTwoType = moveTwoType;
            playerOneMoveThreeType = moveThreeType;
        }
        break;
    case 'Player Two':
        if (testValue(moveOneValue)) {
            playerTwoMoveOneValue = moveOneValue;
        }
        if (testValue(moveTwoValue)) {
            playerTwoMoveTwoValue = moveTwoValue;
        }
        if (testValue(moveThreeValue)) {
            playerTwoMoveThreeValue = moveThreeValue;
        }
        if (testMove(playerTwoMoveOneType)) {
            playerTwoMoveOneType = moveOneType;
        }
        if (testMove(playerTwoMoveTwoType)) {
            playerTwoMoveTwoType = moveTwoType;
        }
        if (testMove(playerTwoMoveThreeType)) {
            playerTwoMoveThreeType = moveThreeType;
        }
        break;
    }
});


setPlayerMoves('Player One', 'rock', 11, 'paper', 33, 'scissors', 44);
// console.log()

