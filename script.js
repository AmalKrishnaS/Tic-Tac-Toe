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

    function getMoveTracker() {
        let gameMoveTracker = moveTracker;
        return gameMoveTracker;
    }

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
            ([a, b, c]) => a !== '' && a === b && b === c
        );

        return isWinner;
    }

    function resultChecker() {
        if (moveTracker > 4) {
            let isWinner = checkWinner();
            if (isWinner) {
                    if (moveTracker % 2 === 1) {
                        result = 'X';
                        displayResult(playerOneName);
                        resetGame();
                        return;

                    }
                    else {
                        result = 'O';
                        displayResult(playerTwoName);
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

    function displayResult(winner) {
        displayController.resultDiv.textContent = `${winner} won the game`;
    }

    function resetGame() {
        player1 = '';
        player2 = '';
        moveTracker = 0;
        board.fill('');
        for (let i=0; i<board.length; i++) {
            displayController.boardCells[i].textContent = board[i];
        };
    }

    return {board, getMoveTracker, makeMove, setPlayerNames, getPlayerNames, getResult};
})();

const displayController = ( function () {
    const board = document.querySelector('.game-board');
    const boardCells = document.querySelectorAll('.game-board-cell');
    const resetButton = document.querySelector('.reset-button');
    const playerNamesButton = document.querySelector('.players-name-button');
    const formDialog = document.querySelector('.form-dialog');
    const resultDialog = document.querySelector('.result-dialog');
    const resultDiv = resultDialog.querySelector('.result');
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

    return {boardCells, resultDiv};
})();
