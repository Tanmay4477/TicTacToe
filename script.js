const board = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
const result = document.getElementById("result");
const image = document.getElementsByTagName("img");
const turnIndicator = document.getElementById("turnIndicator");
let winningCombination = [];
const video = document.createElement("VIDEO");
const container = document.getElementById("videoContainer");



let currentPlayer = "X";
let boardState = Array(9).fill(null);
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function createBoard() {
    console.log("Create Board")
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        board.appendChild(cell);
        cell.addEventListener("click", handleClick);
    }
}


function handleClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] !== null || checkwinner()) {
        return;
    }

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if(checkwinner()) {
        result.textContent = `${currentPlayer} wins`;
        result.style.color = "gold";
        createVideo();
        const cells = board.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if(winningCombination.includes(parseInt(cell.dataset.index))) {
                cell.style.backgroundColor = "blue";
            }
        }
            setTimeout(() => {
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.backgroundColor = "";
                    // reset();
                }
            }, 1000);

        
        // console.log(boardState.indexOf(currentPlayer));
        // console.log(winningPattern());    
    }

    else if (boardState.every((cell) => cell !== null)) {
        result.textContent = "Drawww";
        result.style.color = "white";
        turnIndicator.textContent = "";
    }

    else {
        currentPlayer = currentPlayer === "X" ? "O":"X";
        turnIndicator.textContent = `${currentPlayer}'s turn`;
    }
}


function checkwinner() {
    return winningCombinations.some((combination) => {
        const finalCombination = combination.every((index) => boardState[index] === currentPlayer);
        if (finalCombination === true) {
            winningCombination = combination;
        };
        return finalCombination;
    });
};

function winningPattern() {
    let winningArray = [];
    for (let i = 0; i < 9; i++) {
        if (boardState[i] === currentPlayer ) {
            winningArray.push(i);
        }
    }
    return winningArray;
};

 
function reset() {
    boardState.fill(null);
    currentPlayer = "X";
    Array.from(board.children).forEach((cell) => (cell.textContent = ""));
    result.textContent = "";
    turnIndicator.textContent = "X's turn";
    video.remove();
}


function createVideo() {
    video.setAttribute('width', '300');
    video.setAttribute('controls', 'controls');

    const source = document.createElement("source");
    source.setAttribute("src", "./rick-and-morty-show-middle-finger.960x540.mp4");
    source.setAttribute("type", "video/mp4");
    video.appendChild(source);
    video.play();
    container.appendChild(video);
}



resetButton.addEventListener("click", reset);
createBoard();

