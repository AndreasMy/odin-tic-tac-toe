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

      console.log([a, b, c]);
      if (
        _gameBoardArray[a] !== null &&
        _gameBoardArray[a] === _gameBoardArray[b] &&
        _gameBoardArray[a] === _gameBoardArray[c]
      ) {
        handleWinner(
          ...[_gameBoardArray[a], _gameBoardArray[b], _gameBoardArray[c]]
        );
        return;
      }
    }
    console.log("looking for winner");
  }

  function handleWinner(a, b, c) {
    console.log("executed");
    if (a === "o" && b === "o" && c === "o") {
      alert("player one winners!");
    } else if (a === "x" && b === "x" && c === "x") {
      alert("player two winners!");
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
          handleButtonClick(index);
        }
      });
    });
  }

  function handleButtonClick(index) {
    gameBoard.updateGameArray(index);
    updateGameboard();
    gameBoard.checkWinner();
  }

  function removeElementa() {
    while (gameBoardContainer.firstChild) {
      gameBoardContainer.removeChild(gameBoardContainer.firstChild);
    }
  }

  function updateGameboard() {
    const gameArray = gameBoard.getGameBoardArray();
    removeElementa();
    createGameBoard(gameArray);
    console.log(gameArray);
  }

  return {
    updateGameboard,
  };
})();

displayController.updateGameboard();
