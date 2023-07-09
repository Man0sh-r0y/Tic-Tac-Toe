const boxes = document.querySelectorAll('.box');
const gamePlayer = document.querySelector('.current-player');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;// player 'X' or 'Y'
let gameGrid; // grid part of the tic tac toe. 9 boxes will be fitted into it

let winingPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; // wining positions in the game grid
// If in these positions, in any position, 'X' or '0' presents then match will be won


// starting the game
initGame(); // calling the function to initialise the game

newGameBtn.addEventListener('click', initGame); // adding event listener to new game button
// If I click on the new game button, then the game will be initialised again


function initGame() {// function to initialise the game
    currentPlayer = 'X';// current player is 'X' at the beginning
    gameGrid = ['','','','','','','','',''];// game grid is empty at the beginning
    boxes.forEach((box, index) => {//So, I am using forEach loop to iterate over all the boxes.
        // now emptying the boxes in UI (If I clicked on new game button after previous game).
        box.innerText = "";// emptying the boxes
        boxes[index].style.pointerEvents = "all";// make all the boxes clickable
        box.classList = `box box${index + 1}`;// for each box, their classList also initialized
        // As we have added 'active' class, 'win' class in differert condition of javascript.
        // So when new game starts, box class will also be initialised
    });
    newGameBtn.classList.remove('active');// removing 'active' class from new game button
    gamePlayer.innerText = `Current Player - ${currentPlayer}`;// current player is 'X' at the beginning
}

boxes.forEach((box, index) => {//So, I am using forEach loop to iterate over all the boxes.
    box.addEventListener('click', () => {
        handleBoxClick(index);// calling function to handle box click
    })
});

function handleBoxClick(index) {// function to handle box click
    if (gameGrid[index] === '') {// if the box is empty
        boxes[index].innerText = currentPlayer;// then put the current player in the box (Putting it in the UI)
        gameGrid[index] = currentPlayer;// and also put the current player in the game grid (putting it into the gameGrid array)
        boxes[index].style.pointerEvents = "none";// make the box unclickable. when one player has been put in the box, now we can select it anymore
        swapTurn(); // now swapping the trun of player
        checkGameOver(); // checking if game is over or not
    }
}

function swapTurn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';// if current player is 'X' then make it 'O' and vice versa
    gamePlayer.innerText = `Current Player - ${currentPlayer}`;// updating the current player in UI
}

function checkGameOver() {
    let answer = "";

    winingPositions.forEach((position) => {// iterating over all the wining positions
        let frstPos = gameGrid[position[0]];// getting the first position of the wining position
        let secndPos = gameGrid[position[1]];// getting the second position of the wining position
        let thrdPos = gameGrid[position[2]];// getting the third position of the wining position

        // all 3 boxes should be non empty and same in the value
        if((frstPos !== '' && secndPos !== '' && thrdPos !== '') && frstPos === secndPos && secndPos === thrdPos){// if any of the position is empty
            if (frstPos === 'X') {// if the first position is 'X'
                answer = "X";// then answer is 'X'
            }
            else {// if the first position is 'O'
                answer = "O";// then answer is 'O'
            }

            // disable pointer evenets
            boxes.forEach(box => {
                box.style.pointerEvents = "none";// make all the boxes unclickable
            });// if any player wins, then we don't need to click on any box

            // Now we know player 'X' or 'O' has won the game
            boxes[position[0]].classList.add('win');// adding 'win' class 
            boxes[position[1]].classList.add('win');// adding 'win' class
            boxes[position[2]].classList.add('win');// adding 'win' class
        }
    });

    // if we have a winner: 
    if (answer !== "") {
        gamePlayer.innerText = `Player ${answer} has won!`;// displaying the winner in UI
        newGameBtn.classList.add('active');// adding 'active' class to new game button
        return;
    }

    // if no winner found:
    // checking if match is tie or not:
    let filledBoxes = 0;// variable to count the number of filled boxes
    gameGrid.forEach((box) => {// iterating over all the boxes
        if (box !== "")
            filledBoxes++;// if any box is filled, then increment the filledBoxes variable
    });

    if (filledBoxes === 9) {// if all the boxes are filled
        gamePlayer.innerText = "Match is tie!";// displaying the match is tie in UI
        newGameBtn.classList.add('active');// adding 'active' class to new game button
    }
}