const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let moveHistory = []; // Lưu lại các lượt đi

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Hàng ngang
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cột dọc
    [0, 4, 8], [2, 4, 6]  // Đường chéo
];

function checkWinner() {
    for (let condition of winningCombinations) {
        let [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;

    // Thêm hình ảnh X hoặc O thay vì text
    let img = document.createElement("img");
    img.src = currentPlayer === "X" ? "imgs/x.png" : "imgs/o.png"; // Thay hình ảnh X/O
    event.target.appendChild(img);

    moveHistory.push(index); // Lưu lại vị trí vừa đánh

    // Nếu đã có 6 nước đi trở lên, làm mờ và xóa nước đi đầu tiên
    if (moveHistory.length > 5) {
        let firstMove = moveHistory.shift(); // Lấy nước đi đầu tiên
        let firstCell = cells[firstMove];

        if (firstCell.firstChild) {
            firstCell.firstChild.classList.add("fade-out"); // Thêm hiệu ứng mờ dần
            setTimeout(() => firstCell.removeChild(firstCell.firstChild), 500); // Xóa hình sau 0.5s
        }

        gameBoard[firstMove] = ""; // Xóa dữ liệu trong mảng
    }

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    moveHistory = []; // Xóa lịch sử nước đi

    cells.forEach(cell => {
        cell.innerHTML = ""; // Xóa toàn bộ hình ảnh
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
