const game = (function () {
  const gameboard = [];
  const cols = 3;
  const rows = 3;
  const emptySpace = ' ';
  const markO = 'O';
  const markX = 'X';

  for (let i = 0; i < cols; i++) {
    gameboard.push(new Array(rows).fill(emptySpace));
  }

  const getBoard = () => gameboard;

  const placeMark = (x, y, mark) => {
    if (x < 0 || x > 2 || y < 0 || y > 2) {
      console.log('Error: Invalid space, please try again.');
    } else if (gameboard[x][y] !== emptySpace) {
      console.log('Error: Space is marked, please try again.');
    } else {
      gameboard[x][y] = mark;

      // Check gameboard

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

  const getActivePlayer = () => {
    let activePlayer = '';

    const gameboardString = gameboard.toString();
    const foundEmpty = gameboardString.match(/ /g);
    const foundO = gameboardString.match(/O/g);
    const foundX = gameboardString.match(/X/g);

    if (foundEmpty.length === 9) {
      activePlayer = markO;
    } else if (foundO.length === foundX?.length) {
      activePlayer = markO;
    } else {
      activePlayer = markX;
    }

    return activePlayer;
  };

  return { getBoard, placeMark, getActivePlayer };
})();

const gameDisplay = (function () {
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

  function handleClickBoard(e) {
    // Place mark
    const spaceDiv = e.target;
    const spaceID = spaceDiv.getAttribute('data-id');
    const regex = /\d/g;
    const digits = spaceID.match(regex);
    const x = digits[0];
    const y = digits[1];
    const activePlayer = game.getActivePlayer();

    game.placeMark(x, y, activePlayer);
    if (spaceDiv.textContent === '') {
      spaceDiv.textContent = activePlayer;
    }

    // Turn info
    const playerNamePara = document.querySelector('p.player-name');
    const markerPara = document.querySelector('p.marker');
    const playerOneName = setPlayerName.getPlayerOneName();
    const playerTwoName = setPlayerName.getPlayerTwoName();

    if (activePlayer === 'O') {
      playerNamePara.textContent = `${playerTwoName}'s Turn`;
      markerPara.textContent = 'Marker: X';
    } else {
      playerNamePara.textContent = `${playerOneName}'s Turn`;
      markerPara.textContent = 'Marker: O';
    }
  }

  const spaceDivs = document.querySelectorAll('.space');
  spaceDivs.forEach((div) =>
    div.addEventListener('click', (e) => {
      handleClickBoard(e);
    })
  );
})();

const setPlayerName = (function () {
  const overlay = document.querySelector('.overlay');
  const playBtn = document.querySelector('button.play');
  const playerNamePara = document.querySelector('p.player-name');
  const markerPara = document.querySelector('p.marker');

  let playerOneName = '';
  let playerTwoName = '';

  playBtn.addEventListener('click', () => {
    playerOneName = document.querySelector('input[name=player-one-name]').value;
    playerTwoName = document.querySelector('input[name=player-two-name]').value;

    playerNamePara.textContent = `${playerOneName}'s Turn`;
    markerPara.textContent = 'Marker: O';
    overlay.classList.toggle('hidden');
  });

  const getPlayerOneName = () => playerOneName;

  const getPlayerTwoName = () => playerTwoName;

  return { getPlayerOneName, getPlayerTwoName };
})();
