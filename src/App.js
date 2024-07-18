import "./App.css";
import trumpet from "./img/trumpet.png";
import crying from "./img/crying.png";
import React, { useState } from "react";

export default function App() {
  const [board, setBoard] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(""))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const handleClick = (rowIndex, cellIndex) => {
    if (board[rowIndex][cellIndex] === "") {
      const newBoard = board.map((row, ri) =>
        row.map((cell, ci) => {
          if (ri === rowIndex && ci === cellIndex) {
            return currentPlayer;
          }
          return cell;
        })
      );
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      checkWinner(newBoard);
    }
  };

  const checkWinner = (newBoard) => {
    //check for winner

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        newBoard[i][0] === newBoard[i][1] &&
        newBoard[i][1] === newBoard[i][2] &&
        newBoard[i][0] !== ""
      ) {
        setWinner(newBoard[i][0]);
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        newBoard[0][i] === newBoard[1][i] &&
        newBoard[1][i] === newBoard[2][i] &&
        newBoard[0][i] !== ""
      ) {
        setWinner(newBoard[0][i]);
      }
    }

    // Check diagonals
    if (
      (newBoard[0][0] === newBoard[1][1] &&
        newBoard[1][1] === newBoard[2][2] &&
        newBoard[0][0] !== "") ||
      (newBoard[0][2] === newBoard[1][1] &&
        newBoard[1][1] === newBoard[2][0] &&
        newBoard[0][2] !== "")
    ) {
      setWinner(newBoard[1][1]);
    }

    if (!winner && newBoard.every((row) => row.every((cell) => cell !== ""))) {
      setWinner("draw");
    }
  };

  function popupWinner() {
    if (winner === "X" || winner === "O") {
      document.getElementById("popup-winner").style.display = "block";
    }
    if (winner === "draw") {
      document.getElementById("popup-draw").style.display = "block";
    }
  }
  popupWinner();
  const resetGame = () => {
    setBoard(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(""))
    );
    setCurrentPlayer("X");
    setWinner("");
    document.getElementById("popup-winner").style.display = "none";
    document.getElementById("popup-draw").style.display = "none";
  };


  return (
    <>
      <h1 className="greating">Tic-tac-toe Time!</h1>
      {currentPlayer === "X" && (
        <div className="player">player 1 : {currentPlayer}</div>
      )}
      {currentPlayer === "O" && (
        <div className="player">player 2 : {currentPlayer}</div>
      )}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="cell XOstyle"
                onClick={() => handleClick(rowIndex, cellIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className="popup-winner"
        id="popup-winner"
        style={{ display: "none" }}
      >
        <div className="popup-container">
          <img src={trumpet} alt="icon"></img>
          <h2>Congratulations!</h2>
          {winner === "X" && <p>Player 1 has won</p>}
          {winner === "O" && <p>Player 2 has won</p>}
          <button id="newGame" onClick={resetGame}>
            New Game
          </button>
        </div>
      </div>
      <div className="popup-draw" id="popup-draw" style={{ display: "none" }}>
        <div className="popup-container">
          <img src={crying}></img>
          <h2>oops!</h2>
          <p>There is no winner, Try again</p>
          <button id="newGame" onClick={resetGame}>
            New Game
          </button>
        </div>
      </div>
    </>
  );
}
