const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const CellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const WinningMessageTextElement = document.querySelector('[date-winning-message-text]')
const WinningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById("restartButton")
let circleTurn


startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    CellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    WinningMessageElement.classList.remove('show')


}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverClass()

    }


}

function endGame(draw) {
    if (draw) {
        WinningMessageTextElement.innerText = 'Draw!'

    } else {
        WinningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`

    }
    WinningMessageElement.classList.add('show')
}

function isDraw() {
    return [...CellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return CellElements[index].classList.contains(currentClass)
        })
    })
}