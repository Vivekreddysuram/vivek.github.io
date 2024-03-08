const columns = 7;
const rows = 6;
let currentPlayer = 1;
let gameActive = true;
let board = Array(rows).fill().map(() => Array(columns).fill(0));
const gameBoard = document.getElementById("gameBoard");
const gameStatus = document.getElementById("gameStatus");
const restartModal = document.getElementById("restartModal"); 
const restartText = document.getElementById("restartText"); 
const restartModalButton = document.getElementById("restartModalButton"); 
document.addEventListener('DOMContentLoaded', () => {
    const player1ColorSelection = document.getElementById("player1Color");
    const player2ColorSelection = document.getElementById("player2Color");
    const startGameButton = document.getElementById("startGameButton");
    const colorChoiceModal = document.getElementById("colorChoiceModal");

   
    function updatePlayer2ColorOptions() {
        const selectedColor = player1ColorSelection.value;

       
        for (let option of player2ColorSelection.options) {
         
            if (option.value === selectedColor) {
                option.disabled = true;
                option.hidden = true; 
            } else {
                option.disabled = false; 
                option.hidden = false; 
            }
        }
        
  
        player2ColorSelection.value = player2ColorSelection.querySelector('option:not([disabled])').value;
    }


    player1ColorSelection.addEventListener('change', updatePlayer2ColorOptions);

    startGameButton.onclick = function() {
        colorChoiceModal.style.display = "none";
        document.documentElement.style.setProperty('--player1-color', player1ColorSelection.value);
        document.documentElement.style.setProperty('--player2-color', player2ColorSelection.value);
        createBoard(); 
    };
    


    updatePlayer2ColorOptions();

 
    colorChoiceModal.style.display = "block";
});

window.onload = function() {
    const startGameButton = document.getElementById("startGameButton");
    const colorChoiceModal = document.getElementById("colorChoiceModal");
    const player1Color = document.getElementById("player1Color");
    const player2Color = document.getElementById("player2Color"); 

    colorChoiceModal.style.display = "block";

    startGameButton.onclick = function() {
        colorChoiceModal.style.display = "none";
 
        document.documentElement.style.setProperty('--player1-color', player1Color.value);
        document.documentElement.style.setProperty('--player2-color', player2Color.value); 
        createBoard();
    };

    closeBtn.onclick = function() {
        colorChoiceModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == colorChoiceModal) {
            colorChoiceModal.style.display = "none";
        }
    };
};

function createBoard() {
    gameBoard.innerHTML = '';
    let delay = 0; // Starting delay
    const delayIncrement = 0.05; // Increment delay for each cell

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.animationDelay = `${delay}s`; // Apply the delay
            cell.addEventListener('click', () => handleCellClick(row, col));
            gameBoard.appendChild(cell);
            delay += delayIncrement; // Increment delay for the next cell
        }
    }
}

function handleCellClick(row, col) {
    if (!gameActive) return;
    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][col] === 0) {
            board[r][col] = currentPlayer;
            updateBoard();
            if (checkWinner(r, col)) {
                gameActive = false;
                restartText.textContent = `Player ${currentPlayer} wins!`;
                showModal();
                return;
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            gameStatus.textContent = `Player ${currentPlayer}'s turn`;
            return;
        }
    }
}

function updateBoard() {
    let cellIndex = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = gameBoard.children[cellIndex];
            cell.classList.remove('occupied', 'player1', 'player2');
            if (board[row][col] === 1) {
                cell.classList.add('occupied', 'player1');
            } else if (board[row][col] === 2) {
                cell.classList.add('occupied', 'player2');
            }
            cellIndex++;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let player1Color = ''; 
    let player2Color = ''; 

    const setPlayerColor = (playerNumber, color) => {
        if (playerNumber === 1) {
            player1Color = color;
            console.log(`Player 1 has chosen ${color}`);
        } else if (playerNumber === 2) {
            player2Color = color;
            console.log(`Player 2 has chosen ${color}`);
 
        }

        if (player1Color && player2Color) {
            console.log('Both players have chosen their colors. Starting the game...');
  
        }
    };

    document.querySelectorAll('.swatch').forEach((swatch, index) => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color');

            if (!player1Color) {
                setPlayerColor(1, color);
   
            } else if (!player2Color) {
                setPlayerColor(2, color);

            }
        });
    });
});


function checkWinner(row, col) {
    const player = board[row][col];


    for (let c = 0; c <= columns - 4; c++) {
        if (board[row][c] === player &&
            board[row][c + 1] === player &&
            board[row][c + 2] === player &&
            board[row][c + 3] === player) {
            return true;
        }
    }

    for (let r = 0; r <= rows - 4; r++) {
        if (board[r][col] === player &&
            board[r + 1][col] === player &&
            board[r + 2][col] === player &&
            board[r + 3][col] === player) {
            return true;
        }
    }
 
    for (let r = 0; r <= rows - 4; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] === player &&
                board[r + 1][c + 1] === player &&
                board[r + 2][c + 2] === player &&
                board[r + 3][c + 3] === player) {
                return true;
            }
        }
    }
 
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c <= columns - 4; c++) {
            if (board[r][c] === player &&
                board[r - 1][c + 1] === player &&
                board[r - 2][c + 2] === player &&
                board[r - 3][c + 3] === player) {
                return true;
            }
        }
    }
    return false;
}
function showWinner(winner) {
    const winnerPopup = document.getElementById('winnerPopup');
    const winnerMessage = document.getElementById('winnerMessage');
    const close = document.getElementsByClassName("close")[0];

 
    winnerMessage.innerText = `Player ${winner} wins!`;

  
    winnerPopup.classList.add('show');

 
    close.onclick = function() {
        winnerPopup.classList.remove('show');
    }


    window.onclick = function(event) {
        if (event.target == winnerPopup) {
            winnerPopup.classList.remove('show');
        }
    }
    
}

function showModal() {
    restartModal.style.display = 'block';
}

function resetGame(winner) {
    if (winner) {
        const winnerText = `Player ${winner} wins!`;
        restartText.textContent = winnerText;
        restartModal.style.display = 'block';
    } else {
        restartGame(); 
    }
    document.getElementById("darkModeToggle").onclick = function() {
        document.body.classList.toggle("dark");

    };
    document.getElementById("darkModeToggle").onclick = function() {
        document.body.classList.toggle("dark");
      
    };
        
}

function restartGame() {
    restartModal.style.display = 'none';
    currentPlayer = 1;
    gameActive = true;
    board = Array(rows).fill().map(() => Array(columns).fill(0));
    updateBoard();
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}


gameBoard.addEventListener('click', handleCellClick);

document.getElementById("restartModalButton").addEventListener('click', restartGame);


createBoard();
gameStatus.textContent = `Player ${currentPlayer}'s turn`;
