import { render, screen } from "@testing-library/react";
import App from "./App";

test("render input search to be in the document", () => {
  if (typeof window.matchMedia === "function") {
    render(<App />);

    const inputEl = screen.getByTestId("search");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type");
  }
});

test("render gender select option to be in the document", () => {
  if (typeof window.matchMedia === "function") {
    render(<App />);

    const inputEl = screen.getByTestId("gender");
    expect(inputEl).toBeInTheDocument();
  }
});
