import { describe, it, expect } from "vitest";
import {
  filterCertificates,
  sortByDateDescending,
} from "@/utils/filterCertificates";
import type { Certificate } from "@/types/certificate";

const mockCerts: Certificate[] = [
  {
    id: 1,
    title: "Fundamentals of Responsible AI",
    issuer: "Infosys Springboard",
    date: "2026-02-26",
    category: "AI",
    fileUrl: "/certs/test.pdf",
    imageUrl: "/certs/test.png",
  },
  {
    id: 2,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025-11-10",
    category: "Cloud",
    fileUrl: "/certs/aws.pdf",
    imageUrl: "/certs/aws.png",
  },
  {
    id: 3,
    title: "Deep Learning Specialization",
    issuer: "Coursera",
    date: "2026-01-15",
    category: "AI",
    fileUrl: "/certs/dl.pdf",
    imageUrl: "/certs/dl.png",
  },
];

describe("filterCertificates", () => {
  it("returns all certificates when search is empty and category is All", () => {
    const result = filterCertificates(mockCerts, "", "All");
    expect(result).toHaveLength(3);
  });

  it("filters by title search query", () => {
    const result = filterCertificates(mockCerts, "responsible", "All");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Fundamentals of Responsible AI");
  });

  it("filters by issuer search query", () => {
    const result = filterCertificates(mockCerts, "amazon", "All");
    expect(result).toHaveLength(1);
    expect(result[0].issuer).toBe("Amazon Web Services");
  });

  it("search is case-insensitive", () => {
    const result = filterCertificates(mockCerts, "AWS", "All");
    expect(result).toHaveLength(1);
  });

  it("filters by category", () => {
    const result = filterCertificates(mockCerts, "", "AI");
    expect(result).toHaveLength(2);
  });

  it("combines search and category filter", () => {
    const result = filterCertificates(mockCerts, "deep", "AI");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Deep Learning Specialization");
  });

  it("returns empty array when nothing matches", () => {
    const result = filterCertificates(mockCerts, "nonexistent", "All");
    expect(result).toHaveLength(0);
  });
});

describe("sortByDateDescending", () => {
  it("sorts certificates from newest to oldest", () => {
    const result = sortByDateDescending(mockCerts);
    expect(result[0].date).toBe("2026-02-26");
    expect(result[1].date).toBe("2026-01-15");
    expect(result[2].date).toBe("2025-11-10");
  });

  it("does not mutate the original array", () => {
    const original = [...mockCerts];
    sortByDateDescending(mockCerts);
    expect(mockCerts).toEqual(original);
  });
});
