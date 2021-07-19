import { render, screen } from "@testing-library/react";
import App from "./App";

function sum(a, b) {
  return a + b;
}

// Unit / Integration
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test
test("2 + 2 gives 4", () => {
  expect(sum(2, 2)).toEqual(4);
});
