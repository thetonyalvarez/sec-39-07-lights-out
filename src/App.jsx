import React from "react";
import Board from "./Board";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <Box className="App">
      <header>
        <Typography variant="h1" component="h1">Lights Out!</Typography>
        <Typography variant="p" component="p">Turn off all the lights to win the game!</Typography>
      </header>
      <main>
        <Board ncols={3} nrows={3}/>
      </main>
    </Box>
  );
}

export default App;
