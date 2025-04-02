const gameBoard = (function () {

    let moveTracker = 0;
    let player1 = '';
    let player2 = '';
    
    const board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

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
                        result = `${player1} won the game`;
                        resetGame();
                        return;

                    }
                    else {
                        result = `${player2} won the game`;
                        resetGame();
                        return;
                    }
                 }
            else if (moveTracker === 9) {
                result = 'Game drawn';
                resetGame();
                return;
            }

        }
    }

    function resetGame() {
        player1 = '';
        player2 = '';
        moveTracker = 0;
        board.fill('-');
    }

    return {board, makeMove};
})();

const displayController = ( function () {
    function render () {
        const [first, second, third, fourth, fifth, sixth, seventh, eighth, ninth] = gameBoard.board;
        console.table([[first, second, third], [fourth, fifth, sixth], [seventh, eighth, ninth], ]);
    }
    return {render}; 
})();