const ties = document.getElementById("tie")
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
let tieCount = 0

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


function check() {
    const mark = currentPlayer === 1 ? "X" : "O" // just learned that ? can be used as a true or false condition... pretty cool
    //if currentPlayer equals 1, currentPlayer = X else = O
    let winner = false

    for (let i = 0; i < 3; i++) {
        if (board[i][0].innerHTML == mark && board[i][1].innerHTML == mark && board[i][2].innerHTML == mark) {
            winner = true
        }
    }

    if (!winner) {
        for (let i = 0; i < 3; i++) {
            if (board[0][i].innerHTML == mark && board[1][i].innerHTML == mark && board[2][i].innerHTML == mark) {
                winner = true
            }
        }
    }

    if (!winner) {
        if (board[0][0].innerHTML == mark && board[1][1].innerHTML == mark && board[2][2].innerHTML == mark) {
            winner = true
        } else if (board[0][2].innerHTML == mark && board[1][1].innerHTML == mark && board[2][0].innerHTML == mark) {
            winner = true
        }
    }

    if (winner) {
        statusLabel.innerHTML = `Player ${currentPlayer} has won!`
        playerScores[currentPlayer - 1]++

        playerScoreLabels[0].innerHTML = playerScores[0]
        playerScoreLabels[1].innerHTML = playerScores[1]
        playButton.style.visibility = "visible"
    } else if (turnCount >= 9) {
        statusLabel.innerHTML = "It's a draw, nobody wins"
        tieCount++
        ties.innerHTML = tieCount
        playButton.style.visibility = "visible"
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1
        statusLabel.innerHTML = `Player ${currentPlayer}'s Turn`
        turnCount++
    }
}