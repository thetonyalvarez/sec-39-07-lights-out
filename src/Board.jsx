import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // DONE: create array-of-arrays of true/false values
    let randomizeLight = () => {
      let boolNumber = Math.floor(Math.random() * 2)
      if (boolNumber == 0) {
        return true
      } else if (boolNumber == 1) {
        return false
      }
    }

    for (let y = 0; y < ncols; y++) {
      initialBoard.push(Array.from({ length: nrows }))
      for (let x = 0; x < nrows; x++) {
        initialBoard[y][x] = randomizeLight()
      }
    }
    
    return initialBoard;
  }

  function hasWon() {
    // DONE: check the board in state to determine whether the player has won.
    console.log(board)
    return board.every(row => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    console.log('*******')
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // DONE: Make a (deep) copy of the oldBoard
      const oldBoardCopy = oldBoard.map(row => [...row])

      // DONE: flip target cell and cells above, below, left and right
      flipCell(y, x, oldBoardCopy)
      flipCell(y - 1, x, oldBoardCopy)
      flipCell(y + 1, x, oldBoardCopy)
      flipCell(y, x - 1, oldBoardCopy)
      flipCell(y, x + 1, oldBoardCopy)
      
      // DONE: return old deep copy of board
      return oldBoardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // DONE: all cells must be false to win (false = light is turned off)
  if (hasWon() == false) return <div>You Win!</div>

  // make table board

  // DONE: create cells with props for key and light status

  let gameBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`
      let cell = board[y][x]
      row.push(
        <Cell
          key={coord}
          isLit={cell}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      )
    }
    gameBoard.push(
      <tr
        key={y}
        >
        {row}
      </tr>
    )
  }

  return (
    <table>
      <tbody>
        {gameBoard}
      </tbody>
    </table>
  )
}

export default Board;