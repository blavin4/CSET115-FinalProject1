const playerScoreLabels = document.querySelectorAll(".player-score")
const squares = document.querySelectorAll(".square")
const statusLabel = document.querySelector(".status")
const playButton = document.querySelector(".play-button")

let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

// Puts squares in the board
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        board[i][j] = squares[i * 3 + j]
    }
}

let currentPlayer = 1
let turnCount = 1

let playerScores = [0, 0]

console.log(board)

function start() {
    clear()
    playButton.style.visibility = "hidden"
    turnCount = 1
    statusLabel.innerHTML = `Player ${currentPlayer}'s Turn`
}

function move(square) {
    if (playButton.style.visibility == "hidden") {
        if (square.innerHTML == "") {
            if (currentPlayer == 1) square.innerHTML = "X"
            else square.innerHTML = "O"
        }
        check(indexOfSquare(square))
    }
}

function check(row, column) {
    
}

function clear() {
    squares.forEach(square => {
        square.innerHTML = ""
    })
    currentPlayer = 1
    statusLabel.innerHTML = `Player ${currentPlayer}'s Turn`
}

function indexOfSquare(square) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (square.id == i * 3 + j) {
                return i, j
            }
        }
    }
}

squares.forEach(square => {
    square.addEventListener("click", function () {
        move(this)
    })
});