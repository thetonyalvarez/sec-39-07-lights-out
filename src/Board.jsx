import React, { useState } from "react";
import Cell from "./Cell";
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
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

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // DONE: create array-of-arrays of true/false values
    let randomizeLight = () => {
      return (Math.random() < chanceLightStartsOn)
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
    return board.every(row => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
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
  // DONE: all cells must be false to win
  let msg = ''
  if (hasWon() == true) {
    msg = 
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          <AlertTitle>You Win!</AlertTitle>
        </Alert>
      </Snackbar>
  } 

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
      <TableRow
        key={y}
        >
        {row}
      </TableRow>
    )
  }

  return (
    <TableContainer className="Board">
      <Table
        className="table-board"
        data-testid="table-board"
      >
        <TableBody>
          {gameBoard}
        </TableBody>
      </Table>
      {msg}
    </TableContainer>
  )
}

export default Board;
