const gameBoard = (function () {

    let moveTracker = 0;
    let playerOneName = '';
    let playerTwoName = '';
    let result = '';
    
    const board = ['', '', '', '', '', '', '', '', '',];

    function setPlayerNames(firstPlayerName, secondPlayerName) {
        playerOneName = firstPlayerName;
        playerTwoName = secondPlayerName;
    }

    function getPlayerNames() {
        const firstPlayerName = playerOneName;
        const secondPlayerName = playerTwoName;
        return {firstPlayerName, secondPlayerName};
    }

    function makeMove(position, symbol) {
        board[position - 1] = symbol;

        moveTracker++;
        displayController.render();
        resultChecker();
    }

    function checkWinner() {
        const winningCombination = [
                                        [board[0], board[1], board[2]],
                                        [board[3], board[4], board[5]],
                                        [board[6], board[7], board[8]],
                                        [board[0], board[3], board[6]],
                                        [board[1], board[4], board[7]],
                                        [board[2], board[5], board[8]],
                                        [board[0], board[4], board[8]],
                                        [board[2], board[4], board[6]],
                                   ];
        
        const isWinner = winningCombination.some(
            (a, b, c) => a !== '' && a === b && b === c
        );

        return isWinner;
    }

    function resultChecker() {
        if (moveTracker > 4) {
            let isWinner = checkWinner();
            if (isWinner) {
                    if (moveTracker % 2 === 1) {
                        result = 'X';
                        resetGame();
                        return;

                    }
                    else {
                        result = 'O';
                        resetGame();
                        return;
                    }
                 }
            else if (moveTracker === 9) {
                result = 'draw';
                resetGame();
                return;
            }

        }
    }

    function getResult() {
        const gameResult = result;
        return gameResult;
    }

    function resetGame() {
        player1 = '';
        player2 = '';
        moveTracker = 0;
        board.fill('-');
    }

    return {board, makeMove, setPlayerNames, getPlayerNames, getResult};
})();

const displayController = ( function () {
    const board = document.querySelector('.game-board');
    const resetButton = document.querySelector('.reset-button');
    const playerNamesButton = document.querySelector('.players-name-button');
    const formDialog = document.querySelector('.form');
    const formCloseButton = formDialog.querySelector('.close-button');
    const resultDialog = document.querySelector('.result-dialog');
    const resultCloseButton = resultDialog.querySelector('.close-button');

    board.addEventListener('click', (event) => {
        const cell = event.target;
    });
})();
