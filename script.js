//? Player factory
const Player = (() => {
  const players = {
    player1: {
      name: "player1",
      symbol: "o",
    },
    player2: {
      name: "player2",
      symbol: "x",
    },
  };

  function getplayers() {
    return players;
  }

  return {
    getplayers,
  };
})();

//? gameBoard Module
const gameBoard = (function () {
  "use strict";
  let _gameArray = [null, null, null, null, null, null, null, null, null];
  const players = Player.getplayers();
  let playerTurn = true;

  function updateGameArray(index) {
    if (playerTurn === true) {
      _gameArray[index] = players.player1.symbol;
      playerTurn = false;
    } else if (playerTurn === false) {
      _gameArray[index] = players.player2.symbol;
      playerTurn = true;
    }
  }

  function checkWinner() {
    const conditions = [
      //cols
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    let isTie = true;

    for (let i = 0; i < conditions.length; i++) {
      const [a, b, c] = conditions[i];

      if (
        _gameArray[a] !== null &&
        _gameArray[a] === _gameArray[b] &&
        _gameArray[a] === _gameArray[c]
      ) {
        displayController.displayWinnerText(
          ...[_gameArray[a], _gameArray[b], _gameArray[c]]
        );
        disableBtns();
        return;
      }

      if (_gameArray[a] === _gameArray[b] && _gameArray[a] === _gameArray[c]) {
        isTie = false;
      }

      if (isTie && _gameArray.every((element) => element !== null)) {
        displayController.displayWinnerText(
          ...[_gameArray[a], _gameArray[b], _gameArray[c]]
        );
      }
    }
  }

  function resetGameArray() {
    _gameArray = [null, null, null, null, null, null, null, null, null];
    console.log(_gameArray);
  }

  function disableBtns() {
    const buttons = document.querySelectorAll(".game-button");
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }

  function enableBtns() {
    const buttons = document.querySelectorAll(".game-button");
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }

  return {
    getGameBoardArray: function () {
      return [..._gameArray];
    },
    updateGameArray,
    checkWinner,
    enableBtns,
    resetGameArray,
  };
})();

//? displayController Module
const displayController = (function () {
  "use strict";

  const gameBoardContainer = document.querySelector("#gameBoard");

  function createGameBoard(gameArray) {
    gameArray.forEach((element, index) => {
      const button = document.createElement("button");
      button.classList.add("game-button");
      button.setAttribute("id", `gameBtn_${index}`);

      if (element === null) {
        button.innerHTML = "";
      } else {
        button.innerHTML = `${element}`;
      }

      gameBoardContainer.appendChild(button);
      button.addEventListener("click", () => {
        if (gameArray[index] !== null) {
          button.disabeld = true;
        } else {
          handleGameBoardClick(index);
        }
      });
    });
  }

  function resetGameBtn() {
    const resetBtn = document.querySelector("#resetBtn");
    resetBtn.addEventListener("click", () => {
      gameBoard.resetGameArray();
      gameBoard.enableBtns();
      updateGameboard();
      hideWinnerText();
    });
  }
  resetGameBtn();

  function displayWinnerText(a, b, c) {
    const players = Player.getplayers();
    const text = document.querySelector(".game-status");

    if (a === "o" && b === "o" && c === "o") {
      text.textContent = `${players.player1.name} wins!`;
      text.style.visibility = "visible";
    } else if (a === "x" && b === "x" && c === "x") {
      text.textContent = `${players.player2.name} wins!`;
      text.style.visibility = "visible";
    } else {
      text.textContent = "It's a tie!";
      text.style.visibility = "visible";
    }
  }

  function hideWinnerText() {
    const text = document.querySelector(".game-status");
    text.style.visibility = "hidden";
  }

  function handleGameBoardClick(index) {
    gameBoard.updateGameArray(index);
    updateGameboard();
    gameBoard.checkWinner();
  }

  function removeElements() {
    while (gameBoardContainer.firstChild) {
      gameBoardContainer.removeChild(gameBoardContainer.firstChild);
    }
  }

  function updateGameboard() {
    const gameArray = gameBoard.getGameBoardArray();
    removeElements();
    createGameBoard(gameArray);
  }

  return {
    updateGameboard,
    displayWinnerText,
    hideWinnerText,
  };
})();

displayController.updateGameboard();
