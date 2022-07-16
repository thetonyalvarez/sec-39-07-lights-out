import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { expect, it, describe } from 'vitest'
import Board from "./Board"

it("renders without crashing", function() {
  render(<Board/>)
});

it("matches snapshot", function() {
  const {asFragment} = render(<Board ncols={3} nrows={3} chanceLightStartsOn={1}/>);
  expect(asFragment()).toMatchSnapshot();
});

it("shows cell in the board", function() {
  const { queryByTestId } = render(<Board/>)

  const board = queryByTestId('table-board')
  expect(board).toContainHTML('<td>')
});