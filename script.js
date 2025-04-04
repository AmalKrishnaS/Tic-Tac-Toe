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

        if (board[position - 1] !== '') return;
        
        if (checkWinner()) return;

        if (gameBoard.getMoveTracker() % 2 === 0) {
            board[position - 1] = 'X';       
        }
        else if (gameBoard.getMoveTracker() % 2 === 1) {
            board[position - 1] = 'O'; 
        }  
        displayController.boardCells[position - 1].textContent = board[position - 1];

        moveTracker++;
        setTimeout(checkGameStatus, 1000);
    };

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        return winPatterns.some(([a, b, c]) => 
            board[a] && board[a] === board[b] && board[a] === board[c]
        );
    }

    function checkGameStatus() {
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
                displayResult('draw');
                resetBoard();
                return;
            }

        }
    };

    function displayResult(result) {
        if (result === '') {
            if (moveTracker % 2 === 1){
                result = 'X';
                displayController.resultMessage.textContent = `${result} won the game`;
            }
            else {
                result = 'O';
                displayController.resultMessage.textContent = `${result} won the game`;
            }
        }
        else if (result === 'draw') {
            displayController.resultMessage.textContent = `The game is Draw`;
        }
        else {
            displayController.resultMessage.textContent = `${result} won the game`;
        }

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
    const resultMessage = resultDialog.querySelector('.result');
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

    return {boardCells, resultMessage, showResult, getScoreDivList};
})();
