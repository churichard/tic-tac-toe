// var board = [["X", "O", "X"], ["X", "X", "X"], ["X", "X", "O"]];
var board = [["", "", ""], ["", "", ""], ["", "", ""]];
var boardElm = document.getElementById("tic-tac-toe-div");
var gameStatusElm = document.getElementById("game-status")

// Is player one is the current player?
var players = ["X", "O"];
var currPlayerIndex = 0;

// Keep track of win state
var inWinState = false;

// Renders the tic tac toe board.
function render() {
  // Create board with buttons for each of the spaces
  for (var i = 0; i < board.length; i++) {
    var p = document.createElement("p");
    for (var j = 0; j < board[i].length; j++) {
      p.appendChild(createSpaceButton(board[i][j], i, j));
    }
    boardElm.appendChild(p);
  }
  // Update current player
  gameStatusElm.innerHTML = "Current player: " + players[currPlayerIndex];
}

// Create a new tic tac toe button
function createSpaceButton(spaceMove, i, j) {
  var button = document.createElement("button");
  button.className = "space-button";
  button.innerHTML += spaceMove;
  button.addEventListener("click", spaceButtonClick);
  button.position = [i, j];
  // button.onclick = spaceButtonClick;
  return button;
}

// On space button click
function spaceButtonClick() {
  if (!inWinState) {
    var i = this.position[0], j = this.position[1];
    var currPlayer = players[currPlayerIndex];
    board[i][j] = currPlayer;
    this.innerHTML = currPlayer;
    this.disabled = true;
    // Check to see if the current player won
    if (playerWon()) {
      var winMsg = "Player " + currPlayer + " won!!";
      gameStatusElm.innerHTML = winMsg;
      alert(winMsg);
      inWinState = true;
    }
    // Update current player
    currPlayerIndex = (currPlayerIndex === 0) ? 1 : 0;
    // if (currPlayerIndex === 0) currPlayerIndex = 1;
    // else currPlayerIndex = 0;
    gameStatusElm.innerHTML = "Current player: " + players[currPlayerIndex];
  }
}

// Check to see if one of the players won the game
function playerWon() {
  var rows = board.length;
  var cols = board[0].length;
  var currPlayer = players[currPlayerIndex];

  // Check rows, columns, and diagonals
  var isDiag1WinState = true;
  var isDiag2WinState = true;
  for (var i = 0; i < rows; i++) {
    var isRowWinState = true;
    var isColWinState = true;
    for (var j = 0; j < cols; j++) {
      if (board[i][j] !== currPlayer)
        isRowWinState = false;
      if (board[j][i] !== currPlayer)
        isColWinState = false;
      if (i === j && board[i][j] !== currPlayer)
        isDiag1WinState = false;
      if (i === (cols-1)-j && board[i][j] !== currPlayer)
        isDiag2WinState = false;
    }
    if (isRowWinState || isColWinState) return true;
  }

  return isDiag1WinState || isDiag2WinState;
}

render();

// Challenge: implement a function that checks for draws in the board and
// output a message accordingly.
