import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "./CategoryFilter";

const categories = ["All", "AI", "Cloud"];

describe("CategoryFilter", () => {
  it("renders all category buttons", () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="All"
        onSelect={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "AI" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cloud" })).toBeInTheDocument();
  });

  it("marks the active category with aria-pressed", () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="AI"
        onSelect={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "AI" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("calls onSelect when a category is clicked", () => {
    const handleSelect = vi.fn();
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="All"
        onSelect={handleSelect}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Cloud" }));
    expect(handleSelect).toHaveBeenCalledWith("Cloud");
  });

  it("has a group role with accessible label", () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="All"
        onSelect={() => {}}
      />
    );
    expect(
      screen.getByRole("group", { name: /filter by category/i })
    ).toBeInTheDocument();
  });
});
