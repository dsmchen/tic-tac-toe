const makeGame = (function () {
  const gameboard = [];
  const cols = 3;
  const rows = 3;
  const emptySpace = ' ';

  for (let i = 0; i < cols; i++) {
    gameboard.push(new Array(rows).fill(emptySpace));
  }

  const logGameboard = () => console.log(gameboard);

  const logMark = (x, y, mark) => {
    if (x < 0 || x > 2 || y < 0 || y > 2) {
      console.log('Error: Invalid space, please try again.');
    } else if (gameboard[x][y] !== emptySpace) {
      console.log('Error: Space is marked, please try again.');
    } else {
      gameboard[x][y] = mark;

      // Check gameboard

      const isO = (currentValue) => currentValue === 'O';
      const isX = (currentValue) => currentValue === 'X';

      const gameboardColA = [];
      const gameboardColB = [];
      const gameboardColC = [];
      const gameboardEmptySpace = [];

      for (const array of gameboard) {
        // Check row
        if (array.every(isO)) {
          return console.log('Game over! The winner is O!');
        } else if (array.every(isX)) {
          return console.log('Game over! The winner is X!');
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
        return console.log('Game over! The winner is O!');
      } else if (
        gameboardColA.every(isX) ||
        gameboardColB.every(isX) ||
        gameboardColC.every(isX)
      ) {
        return console.log('Game over! The winner is X!');
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
        return console.log('Game over! The winner is O!');
      } else if (
        gameboardDiagonalA.every(isX) ||
        gameboardDiagonalB.every(isX)
      ) {
        return console.log('Game over! The winner is X!');
      }

      // Check tie
      if (!gameboardEmptySpace.includes(true)) {
        return console.log('Game over! O and X tie!');
      }
    }
  };

  return { logGameboard, logMark };
})();

makeGame.logGameboard();

// row
// makeGame.logMark(1, 0, 'O');
// makeGame.logMark(1, 1, 'O');
// makeGame.logMark(1, 2, 'O');
// makeGame.logMark(1, 0, 'X');
// makeGame.logMark(1, 1, 'X');
// makeGame.logMark(1, 2, 'X');

// column
// makeGame.logMark(0, 2, 'O');
// makeGame.logMark(1, 2, 'O');
// makeGame.logMark(2, 2, 'O');
// makeGame.logMark(0, 0, 'X');
// makeGame.logMark(1, 0, 'X');
// makeGame.logMark(2, 0, 'X');

// diagonal
// makeGame.logMark(0, 0, 'O');
// makeGame.logMark(1, 1, 'O');
// makeGame.logMark(2, 2, 'O');
// makeGame.logMark(0, 2, 'X');
// makeGame.logMark(1, 1, 'X');
// makeGame.logMark(2, 0, 'X');

// tie
makeGame.logMark(1, 1, 'O');
makeGame.logMark(0, 0, 'X');
makeGame.logMark(0, 2, 'O');
makeGame.logMark(2, 0, 'X');
makeGame.logMark(1, 0, 'O');
makeGame.logMark(1, 2, 'X');
makeGame.logMark(0, 1, 'O');
makeGame.logMark(2, 1, 'X');
makeGame.logMark(2, 2, 'O');
