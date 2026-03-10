import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders the search input", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(
      screen.getByRole("textbox", { name: /search certificates/i })
    ).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(<SearchBar value="test query" onChange={() => {}} />);
    expect(screen.getByDisplayValue("test query")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });
    expect(handleChange).toHaveBeenCalledWith("hello");
  });

  it("shows the / keyboard shortcut badge", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("hides the badge when input is focused", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    expect(screen.queryByText("/")).not.toBeInTheDocument();
  });

  it("focuses input when / key is pressed", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    fireEvent.keyDown(document, { key: "/" });
    expect(document.activeElement).toBe(input);
  });

  it("blurs input when Escape key is pressed", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    input.focus();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.activeElement).not.toBe(input);
  });
});
