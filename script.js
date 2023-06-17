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
  let _gameBoardArray = [null, null, null, null, null, null, null, null, null];
  const players = Player.getplayers();
  let playerTurn = true;

  function updateGameArray(index) {
    if (playerTurn === true) {
      _gameBoardArray[index] = players.player1.symbol;
      playerTurn = false;
    } else if (playerTurn === false) {
      _gameBoardArray[index] = players.player2.symbol;
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

    for (let i = 0; i < conditions.length; i++) {
      const [a, b, c] = conditions[i];
      //! bug: full board triggers tie, even if a player has a row
      if (
        _gameBoardArray[a] !== null &&
        _gameBoardArray[a] === _gameBoardArray[b] &&
        _gameBoardArray[a] === _gameBoardArray[c]
      ) {
        displayController.displayWinnerText(
          ...[_gameBoardArray[a], _gameBoardArray[b], _gameBoardArray[c]]
        );
        return;
      } else if (_gameBoardArray.every((element) => element !== null)) {
        displayController.displayWinnerText(
          ...[_gameBoardArray[a], _gameBoardArray[b], _gameBoardArray[c]]
        );
        return;
      }
    }
  }

  return {
    getGameBoardArray: function () {
      return [..._gameBoardArray];
    },
    updateGameArray,
    checkWinner,
  };
})();

//? displayController Module
const displayController = (function () {
  "use strict";

  const gameBoardContainer = document.querySelector("#gameBoard");

  function createGameBoard(gameArray) {
    gameArray.forEach((element, index) => {
      const button = document.createElement("button");
      button.classList.add(`button`);
      button.setAttribute("id", `gameBtn_${index}`);

      if (element === null) {
        button.innerHTML = "";
      } else {
        button.innerHTML = `${element}`;
      }

      gameBoardContainer.appendChild(button);
      button.addEventListener("click", () => {
        if (gameArray[index] !== null) {
          button.disabeled = true;
        } else {
          handleGameBoardClick(index);
        }
      });
    });
  }

  function displayWinnerText(a, b, c) {
    const players = Player.getplayers();
    const winnerTxt = document.querySelector("#winnerTxt");
    const text = document.createElement("h2");
    text.classList.add("text");

    if (a === "o" && b === "o" && c === "o") {
      text.textContent = `${players.player1.name} wins!`;
    } else if (a === "x" && b === "x" && c === "x") {
      text.textContent = `${players.player2.name} wins!`;
    } else {
      text.textContent = "It's a tie!";
    }

    winnerTxt.innerHTML = "";
    winnerTxt.appendChild(text);
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
  };
})();

displayController.updateGameboard();
