"use client";

import { useState } from "react";
import certData from "@/data/certificates.json";
import type { Certificate } from "@/types/certificate";
import { filterCertificates, sortByDateDescending } from "@/utils/filterCertificates";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import CertificateGrid from "@/components/CertificateGrid";

const certificates: Certificate[] = certData;

export default function CertificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(certificates.map((c) => c.category))),
  ];

  const filtered = filterCertificates(certificates, searchQuery, categoryFilter);
  const sorted = sortByDateDescending(filtered);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="mb-12 space-y-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            activeCategory={categoryFilter}
            onSelect={setCategoryFilter}
          />
        </div>

        <CertificateGrid certificates={sorted} />
      </div>
    </main>
  );
}
