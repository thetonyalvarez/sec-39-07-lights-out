import React from "react";
import TableCell from '@mui/material/TableCell'
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 * 
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <TableCell
          className={classes}
          onClick={flipCellsAroundMe}
          data-testid="cell"
          sx={{ borderBottom: 0 }}
        />;
}

export default Cell;
