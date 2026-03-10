import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the heading", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { level: 1, name: /my certifications/i })
    ).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Header />);
    expect(
      screen.getByText(/visual catalog of my professional certifications/i)
    ).toBeInTheDocument();
  });

  it("uses a header element", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
