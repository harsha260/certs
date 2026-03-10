import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CertificateCard from "./CertificateCard";
import type { Certificate } from "@/types/certificate";

// Mock next/image since it's not available in test environment
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockCert: Certificate = {
  id: 1,
  title: "Test Certificate",
  issuer: "Test Issuer",
  date: "2026-01-15",
  category: "AI",
  fileUrl: "/certs/test.pdf",
  imageUrl: "/certs/test.png",
};

describe("CertificateCard", () => {
  it("renders the certificate title in the always-visible info", () => {
    render(<CertificateCard cert={mockCert} />);
    // The title appears in the always-visible area (and also in the overlay)
    const titles = screen.getAllByText("Test Certificate");
    expect(titles.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the issuer in the always-visible info", () => {
    render(<CertificateCard cert={mockCert} />);
    const issuerTexts = screen.getAllByText(/Test Issuer/);
    expect(issuerTexts.length).toBeGreaterThanOrEqual(1);
  });

  it("has a button with aria-expanded for the overlay toggle", () => {
    render(<CertificateCard cert={mockCert} />);
    const button = screen.getByRole("button", {
      name: /show details for test certificate/i,
    });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles the overlay on click", () => {
    render(<CertificateCard cert={mockCert} />);
    const button = screen.getByRole("button", {
      name: /show details for test certificate/i,
    });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles the overlay on Enter key", () => {
    render(<CertificateCard cert={mockCert} />);
    const button = screen.getByRole("button", {
      name: /show details for test certificate/i,
    });
    fireEvent.keyDown(button, { key: "Enter" });
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles the overlay on Space key", () => {
    render(<CertificateCard cert={mockCert} />);
    const button = screen.getByRole("button", {
      name: /show details for test certificate/i,
    });
    fireEvent.keyDown(button, { key: " " });
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the overlay on Escape key", () => {
    render(<CertificateCard cert={mockCert} />);
    const button = screen.getByRole("button", {
      name: /show details for test certificate/i,
    });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(button, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("renders View and Download links", () => {
    render(<CertificateCard cert={mockCert} />);
    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  it("View link opens in new tab", () => {
    render(<CertificateCard cert={mockCert} />);
    const viewLink = screen.getByText("View").closest("a");
    expect(viewLink).toHaveAttribute("target", "_blank");
    expect(viewLink).toHaveAttribute("href", "/certs/test.pdf");
  });

  it("Download link has download attribute", () => {
    render(<CertificateCard cert={mockCert} />);
    const downloadLink = screen.getByText("Download").closest("a");
    expect(downloadLink).toHaveAttribute("download");
    expect(downloadLink).toHaveAttribute("href", "/certs/test.pdf");
  });

  it("handles invalid date gracefully", () => {
    const certWithBadDate = { ...mockCert, date: "invalid-date" };
    render(<CertificateCard cert={certWithBadDate} />);
    // Should not show NaN, the year should be empty
    const allText = document.body.textContent ?? "";
    expect(allText).not.toContain("NaN");
  });

  it("closes overlay when clicking outside", () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <CertificateCard cert={mockCert} />
      </div>
    );
    const button = screen.getByRole("button", {
      name: /show details for test certificate/i,
    });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
