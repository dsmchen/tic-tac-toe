const game = (function () {
  const gameboard = [];
  const cols = 3;
  const rows = 3;
  const emptySpace = ' ';

  for (let i = 0; i < cols; i++) {
    gameboard.push(new Array(rows).fill(emptySpace));
  }

  const getBoard = () => gameboard;

  const logMark = (x, y, mark) => {
    if (x < 0 || x > 2 || y < 0 || y > 2) {
      console.log('Error: Invalid space, please try again.');
    } else if (gameboard[x][y] !== emptySpace) {
      console.log('Error: Space is marked, please try again.');
    } else {
      gameboard[x][y] = mark;

      // Check gameboard

      const markO = 'O';
      const markX = 'X';
      const isO = (currentValue) => currentValue === markO;
      const isX = (currentValue) => currentValue === markX;
      const winnerString = 'Game over! The winner is ';
      const tieString = `Game over! ${markO} and ${markX} tie!`;

      const gameboardColA = [];
      const gameboardColB = [];
      const gameboardColC = [];
      const gameboardEmptySpace = [];

      for (const array of gameboard) {
        // Check row
        if (array.every(isO)) {
          return console.log(`${winnerString}${markO}!`);
        } else if (array.every(isX)) {
          return console.log(`${winnerString}${markX}!`);
        }

        gameboardColA.push(array[0]);
        gameboardColB.push(array[1]);
        gameboardColC.push(array[2]);
        gameboardEmptySpace.push(array.includes(emptySpace));
      }

      // Check column
      if (
        gameboardColA.every(isO) ||
        gameboardColB.every(isO) ||
        gameboardColC.every(isO)
      ) {
        return console.log(`${winnerString}${markO}!`);
      } else if (
        gameboardColA.every(isX) ||
        gameboardColB.every(isX) ||
        gameboardColC.every(isX)
      ) {
        return console.log(`${winnerString}${markX}!`);
      }

      // Check diagonal
      const gameboardDiagonalA = [
        gameboard[0][0],
        gameboard[1][1],
        gameboard[2][2],
      ];
      const gameboardDiagonalB = [
        gameboard[0][2],
        gameboard[1][1],
        gameboard[2][0],
      ];
      if (gameboardDiagonalA.every(isO) || gameboardDiagonalB.every(isO)) {
        return console.log(`${winnerString}${markO}!`);
      } else if (
        gameboardDiagonalA.every(isX) ||
        gameboardDiagonalB.every(isX)
      ) {
        return console.log(`${winnerString}${markX}!`);
      }

      // Check tie
      if (!gameboardEmptySpace.includes(true)) {
        return console.log(tieString);
      }
    }
  };

  return { getBoard, logMark };
})();

const gameboardDisplay = (function () {
  const gameboardArray = game.getBoard();
  const gameboardDiv = document.querySelector('.gameboard');

  for (let i = 0; i < gameboardArray.length; i++) {
    for (let j = 0; j < gameboardArray[i].length; j++) {
      const spaceDiv = document.createElement('div');
      const spaceID = `${i}-${j}`;
      spaceDiv.classList.add('space');
      spaceDiv.setAttribute('data-id', spaceID);
      gameboardDiv.appendChild(spaceDiv);
    }
  }
})();

console.log(game.getBoard());

// row
// game.logMark(1, 0, 'O');
// game.logMark(1, 1, 'O');
// game.logMark(1, 2, 'O');
// game.logMark(1, 0, 'X');
// game.logMark(1, 1, 'X');
// game.logMark(1, 2, 'X');

// column
// game.logMark(0, 2, 'O');
// game.logMark(1, 2, 'O');
// game.logMark(2, 2, 'O');
// game.logMark(0, 0, 'X');
// game.logMark(1, 0, 'X');
// game.logMark(2, 0, 'X');

// diagonal
// game.logMark(0, 0, 'O');
// game.logMark(1, 1, 'O');
// game.logMark(2, 2, 'O');
// game.logMark(0, 2, 'X');
// game.logMark(1, 1, 'X');
// game.logMark(2, 0, 'X');

// tie
game.logMark(1, 1, 'O');
game.logMark(0, 0, 'X');
game.logMark(0, 2, 'O');
game.logMark(2, 0, 'X');
game.logMark(1, 0, 'O');
game.logMark(1, 2, 'X');
game.logMark(0, 1, 'O');
game.logMark(2, 1, 'X');
game.logMark(2, 2, 'O');
