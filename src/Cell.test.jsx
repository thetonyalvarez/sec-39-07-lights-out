import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { expect, it, describe } from 'vitest'
import Cell from "./Cell"

it("renders without crashing", function() {
  render(<Cell/>)
});

it("matches snapshot", function() {
  const {asFragment} = render(<Cell />);
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Cell' class", function() {
  const { queryByTestId } = render(<Cell/>)

  const cell = queryByTestId('cell')
  expect(cell).toHaveClass('Cell')
})