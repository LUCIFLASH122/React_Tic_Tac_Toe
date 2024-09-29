import { useState } from "react";
import Player from "./components/Player.jsx";
import Gameboard from "./components/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBO } from "./Winning";
import Gameover from "./components/Gameover.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveactiveplayer(gameturn) {
  let currplayer = "X";

  if (gameturn.length > 0 && gameturn[0].player === "X") {
    currplayer = "O";
  }
  return currplayer;
}

function deriveGameBoard(gameturn) {
  let gameboard = [...initialGameboard.map((array) => [...array])];

  for (const turn of gameturn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }
  return gameboard;
}

function deriveWinner(gameboard, players) {
  let winner;

  for (const combination of WINNING_COMBO) {
    const firstsymbol = gameboard[combination[0].row][combination[0].column];
    const secondsymbol = gameboard[combination[1].row][combination[1].column];
    const thirdsymbol = gameboard[combination[2].row][combination[2].column];
    if (
      firstsymbol &&
      firstsymbol === secondsymbol &&
      firstsymbol === thirdsymbol
    ) {
      winner = players[firstsymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setplayers] = useState(PLAYERS);
  const [gameturn, setgameturn] = useState([]);
  const activeplayer = deriveactiveplayer(gameturn);
  const gameboard = deriveGameBoard(gameturn);
  const winner = deriveWinner(gameboard, players);
  const hasdraw = gameturn.length == 9 && !winner;

  function handleRestart() {
    setgameturn([]);
  }

  function handleplayername(symbol, newName) {
    setplayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handlesquare(rowindex, colindex) {
    setgameturn((prevturn) => {
      const currplayer = deriveactiveplayer(prevturn);
      const updatedturn = [
        { square: { row: rowindex, col: colindex }, player: currplayer },
        ...prevturn,
      ];
      return updatedturn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isactive={activeplayer === "X"}
            onChangeName={handleplayername}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isactive={activeplayer === "O"}
            onChangeName={handleplayername}
          />
        </ol>
        {(winner || hasdraw) && (
          <Gameover winner={winner} onRestart={handleRestart} />
        )}
        <Gameboard
          onselectsquare={handlesquare}
          turns={gameturn}
          board={gameboard}
        />
      </div>
      <Log turns={gameturn} />
    </main>
  );
}

export default App;
