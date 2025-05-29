const cellElements = document.querySelectorAll('.cell');
const winningContribution = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];
const clickSound = new Audio('pop-94319.mp3'); 
let circleTurn = false;

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const clickedCell = e.target;
    const currentClass = circleTurn ? "circle" : "x";
    clickedCell.classList.add(currentClass);
    clickSound.play();

    if (checkWin(currentClass)) {
        displayWinner(currentClass);
    } else if (isDraw()) {
        displayDraw();
    } else {
        circleTurn = !circleTurn;
    }
}

function checkWin(currentClass) {
    return winningContribution.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function displayWinner(winner) {
    const message = `Hurrah!!! Winner is ${winner} 😁`;
    showFinalMessage(message);
}

function displayDraw() {
    const message = "No!! It's a Draw! 😒 ";
    showFinalMessage(message);
}

function showFinalMessage(message) {
    const finalMessageElement = document.querySelector('.final-winner');
    finalMessageElement.innerHTML = message;
    finalMessageElement.parentElement.classList.add('show');
}

document.querySelector('button').onclick = restart;

function restart() {
    cellElements.forEach(cell => {
        cell.classList.remove('x', 'circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    circleTurn = false;
    const finalMessageElement = document.querySelector('.final-winner');
    finalMessageElement.innerHTML = '';
    finalMessageElement.parentElement.classList.remove('show');
}
