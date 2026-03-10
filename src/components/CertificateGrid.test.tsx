import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CertificateGrid from "./CertificateGrid";
import type { Certificate } from "@/types/certificate";

// Mock CertificateCard to avoid needing to mock next/image transitively
vi.mock("./CertificateCard", () => ({
  default: ({ cert }: { cert: Certificate }) => (
    <div data-testid={`cert-card-${cert.id}`}>{cert.title}</div>
  ),
}));

const mockCerts: Certificate[] = [
  {
    id: 1,
    title: "Certificate A",
    issuer: "Issuer A",
    date: "2026-01-01",
    category: "AI",
    fileUrl: "/certs/a.pdf",
    imageUrl: "/certs/a.png",
  },
  {
    id: 2,
    title: "Certificate B",
    issuer: "Issuer B",
    date: "2025-06-15",
    category: "Cloud",
    fileUrl: "/certs/b.pdf",
    imageUrl: "/certs/b.png",
  },
];

describe("CertificateGrid", () => {
  it("renders the empty state when no certificates match", () => {
    render(<CertificateGrid certificates={[]} />);
    expect(
      screen.getByText(/no certificates found matching your criteria/i)
    ).toBeInTheDocument();
  });

  it("renders certificate cards for each certificate", () => {
    render(<CertificateGrid certificates={mockCerts} />);
    expect(screen.getByTestId("cert-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("cert-card-2")).toBeInTheDocument();
  });

  it("shows the correct count in the sr-only text", () => {
    render(<CertificateGrid certificates={mockCerts} />);
    expect(screen.getByText("2 certificates found")).toBeInTheDocument();
  });

  it("uses singular form for 1 certificate", () => {
    render(<CertificateGrid certificates={[mockCerts[0]]} />);
    expect(screen.getByText("1 certificate found")).toBeInTheDocument();
  });

  it("has an aria-live region", () => {
    render(<CertificateGrid certificates={mockCerts} />);
    const section = screen.getByRole("region", { name: "Certificate results" });
    expect(section).toHaveAttribute("aria-live", "polite");
  });
});
