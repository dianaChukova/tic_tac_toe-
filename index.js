let cells = document.querySelectorAll(".cell_1, .cell_2, .cell_3, .cell_4, .cell_5, .cell_6, .cell_7, .cell_8, .cell_9");
const player1Input = document.querySelector(".player1");
const player2Input = document.querySelector(".player2");
let currentPlayer = 'X';
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameIsOver = false;
let player1Name = "Player 1";
let player2Name = "Player 2";

player1Input.addEventListener("change", () => player1Name = player1Input.value || "Player 1");
player2Input.addEventListener("change", () => player2Name = player2Input.value || "Player 2");

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!gameIsOver && cell.value === "") {
            if (currentPlayer === 'X') {
                cell.value = '❌';
                gameBoard[index] = 'X';
            } else {
                cell.value = '◯';
                gameBoard[index] = 'O';
            }
            if (checkWin() || checkDraw()) {
                gameIsOver = true;
                let winnerName = currentPlayer === 'X' ? player1Name : player2Name;
                alert(gameIsOver ? (checkWin() ? `Победил ${winnerName}` : "Ничья") : ""); 
                resetGame();
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
        }
    }
    return null;
}

function checkDraw() {
	return gameBoard.every(cell => cell !== "");
}

function resetGame() {
    gameIsOver = false;
    gameBoard.fill("");
    currentPlayer = 'X';
    cells.forEach(cell => cell.value = "");
}


