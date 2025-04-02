const gameBoard = (function () {

    let moveTracker = 0;
    let playerOneName = '';
    let playerTwoName = '';
    let result = '';
    
    const board = [];

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

    function resultChecker() {
        if (moveTracker > 4) {
            if (board[0] === board[1] && board[1] === board[2] ||
                board[3] === board[4] && board[4] === board[5] ||
                board[6] === board[7] && board[7] === board[8] ||
                board[0] === board[3] && board[3] === board[6] ||
                board[1] === board[4] && board[4] === board[7] ||
                board[2] === board[5] && board[5] === board[8] ||
                board[0] === board[4] && board[4] === board[8] ||
                board[2] === board[4] && board[4] === board[6]
                                               
               ) {
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
    function render () {
        const [first, second, third, fourth, fifth, sixth, seventh, eighth, ninth] = gameBoard.board;
    }
    return {render}; 
})();