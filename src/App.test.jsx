import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { expect, it, describe } from 'vitest'
import App from "./App"

it("renders without crashing", function() {
  render(<App/>)
});