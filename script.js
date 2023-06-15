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

const gameController = (function () {
  "use strict";
  //? Alternate between player input/turns
  //code
})();

//? gameBoard Module
const gameBoard = (function () {
  "use strict";
  let _gameBoardArray = ["x", "x", null, "o", "x", null, "x", null, "x"];

  function updateGameArray(index, value) {
    _gameBoardArray[index] = value;
  }

  return {
    getGameBoardArray: function () {
      return [..._gameBoardArray];
    },
    updateGameArray,
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
    const newValue = "i";

    gameBoard.updateGameArray(index, newValue);
    updateGameboard();
    console.log(gameBoard.getGameBoardArray());
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
  }

  return {
    updateGameboard,
  };
})();

displayController.updateGameboard();
