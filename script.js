const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data_winningMsg_text]');
const winningMessageElement = document.getElementById('winningMsg')
let circleTurn;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const restartBtn = document.getElementById('restart');
startGame();




function startGame() {
    winningMessageElement.classList.remove('show');
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.addEventListener("click", handleClick, { once: true });

    })


    setBoardHover();
}
setBoardHover()
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placemark(cell, currentClass);
    if (checkWin(currentClass)) {
        endgame(false)
    }
    else if (isDraw()) {
        endgame(true)
    }
    swapturns()
    setBoardHover()
}

function endgame(draw) {
    if (draw) {
        winningMessageTextElement.innerHTML = "Draw!";
    }
    else {
        winningMessageTextElement.innerHTML = `${circleTurn ? "O" : "X"} Wins!`
    }

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    })
}

function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapturns() {
    circleTurn = !circleTurn;
}

function setBoardHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
restartBtn.addEventListener('click', startGame)

