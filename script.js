document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('sudoku-board');
    const newGameBtn = document.getElementById('new-game-btn');
    const checkBtn = document.getElementById('check-btn');

    let board = [];
    let solution = [];

    const baseBoard = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    function createPuzzle() {
        // Create a deep copy of the base board for the solution
        solution = JSON.parse(JSON.stringify(baseBoard));

        // Create a puzzle by removing some numbers
        board = JSON.parse(JSON.stringify(baseBoard));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (Math.random() > 0.5) {
                    board[i][j] = 0;
                }
            }
        }
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            for (let j = 0; j < 9; j++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                if (board[i][j] !== 0) {
                    cellElement.textContent = board[i][j];
                    cellElement.classList.add('fixed');
                } else {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.min = 1;
                    input.max = 9;
                    cellElement.appendChild(input);
                }
                rowElement.appendChild(cellElement);
            }
            boardElement.appendChild(rowElement);
        }
    }

    function checkSolution() {
        const inputs = boardElement.querySelectorAll('input');
        let currentBoard = JSON.parse(JSON.stringify(board));
        let inputIndex = 0;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentBoard[i][j] === 0) {
                    const val = inputs[inputIndex].value;
                    currentBoard[i][j] = val ? parseInt(val) : 0;
                    inputIndex++;
                }
            }
        }

        let correct = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentBoard[i][j] !== solution[i][j]) {
                    correct = false;
                    break;
                }
            }
            if (!correct) break;
        }

        if (correct) {
            alert('Congratulations! You solved it!');
        } else {
            alert('Something is wrong. Keep trying!');
        }
    }

    function newGame() {
        createPuzzle();
        renderBoard();
    }

    newGameBtn.addEventListener('click', newGame);
    checkBtn.addEventListener('click', checkSolution);

    // Initial game start
    newGame();
});