const gameBoard = (function () {

    let moveTracker = 0;
    let playerOneName = '';
    let playerTwoName = '';
    let playerOneScore = 0;
    let playerTwoScore = 0;
    
    const board = ['', '', '', '', '', '', '', '', '',];

    function setPlayerNames(firstPlayerName, secondPlayerName) {
        playerOneName = firstPlayerName;
        playerTwoName = secondPlayerName;
    };

    function getPlayerNames() {
        const firstPlayerName = playerOneName;
        const secondPlayerName = playerTwoName;
        return {firstPlayerName, secondPlayerName};
    };

    function resetPlayerNames() {
        playerOneName = '';
        playerTwoName = '';
    };

    function resetPlayerScores() {
        playerOneScore = 0;
        playerTwoScore = 0;
    }

    function getMoveTracker() {
        let gameMoveTracker = moveTracker;
        return gameMoveTracker;
    };

    function makeMove(position) {

        if (gameBoard.getMoveTracker() % 2 === 0) {
            board[position - 1] = 'X';       
        }
        else if (gameBoard.getMoveTracker() % 2 === 1) {
            board[position - 1] = 'O'; 
        }  
        displayController.boardCells[position - 1].textContent = board[position - 1];

        moveTracker++;
        setTimeout(resultChecker, 300);
    };

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
            ([a, b, c]) => a !== '' && a === b && b === c
        );

        return isWinner;
    };

    function resultChecker() {
        if (moveTracker > 4) {
            let isWinner = checkWinner();
            if (isWinner) {
                    if (moveTracker % 2 === 1) {
                        playerOneScore++;
                        displayResult(playerOneName);
                        resetBoard();
                        return;

                    }
                    else {
                        playerTwoScore++;
                        displayResult(playerTwoName);
                        resetBoard();
                        return;
                    }
                 }
            else if (moveTracker === 9) {
                result = 'draw';
                resetBoard();
                return;
            }

        }
    };

    function displayResult(winner) {
        if (winner === '') {
            if (moveTracker % 2 === 0){
                winner = 'X';
            }
            else {
                winner = 'O';
            }
        }
        displayController.resultDiv.textContent = `${winner} won the game`;
        if (playerOneName === '') {
            playerOneName = 'X';    
        }
        
        if (playerTwoName === '') {
            playerTwoName = 'O';
        }

        displayController.getScoreDivList()[0].textContent = `${playerOneName}: ${playerOneScore}`;
        displayController.getScoreDivList()[1].textContent = `${playerTwoName}: ${playerTwoScore}`;
        displayController.showResult();
    };

    function resetBoard() {
        moveTracker = 0;
        board.fill('');
        for (let i=0; i<board.length; i++) {
            displayController.boardCells[i].textContent = board[i];
        };
    };

    return {board, getMoveTracker, makeMove, setPlayerNames, getPlayerNames, resetPlayerNames, resetPlayerScores};
})();

const displayController = ( function () {
    const board = document.querySelector('.game-board');
    const boardCells = document.querySelectorAll('.game-board-cell');
    const resetButton = document.querySelector('.reset-button');
    const playerNamesButton = document.querySelector('.players-name-button');
    const formDialog = document.querySelector('.form-dialog');
    const resultDialog = document.querySelector('.result-dialog');
    const resultDiv = resultDialog.querySelector('.result');
    const scoreDivList = resultDialog.querySelectorAll('.score');
    const resultCloseButton = resultDialog.querySelector('.close-button');
    const submitButton = formDialog.querySelector('.submit-button');
    const form = formDialog.querySelector('.form');

    board.addEventListener('click', (event) => {
        const cell = event.target;
        const position = cell.getAttribute('data-position');
        gameBoard.makeMove(position);    
    });

    playerNamesButton.addEventListener('click', (event) => {
        formDialog.showModal();
    });

    submitButton.addEventListener('click',(event) => {
        event.preventDefault();

        const inputList = formDialog.querySelectorAll('.input');
        gameBoard.setPlayerNames(inputList[0].value, inputList[1].value);
        console.log(gameBoard.getPlayerNames().firstPlayerName);
        form.reset();
        formDialog.close();       
    });

    function showResult() {
        resultDialog.showModal();
    };

    function getScoreDivList() {
        const divList = scoreDivList;
        return divList;
    }

    resultCloseButton.addEventListener('click', () => {
        resultDialog.close();
    });

    resetButton.addEventListener('click', () => {
        gameBoard.resetPlayerNames();
        gameBoard.resetPlayerScores();
    });

    return {boardCells, resultDiv, showResult, getScoreDivList};
})();
