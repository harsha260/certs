"use client";

import { useState } from "react";
import type { Certificate } from "@/types/certificate";
import { filterCertificates, sortByDateDescending } from "@/utils/filterCertificates";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import CertificateGrid from "@/components/CertificateGrid";

interface CertificateExplorerProps {
  certificates: Certificate[];
  categories: string[];
}

export default function CertificateExplorer({
  certificates,
  categories,
}: CertificateExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = filterCertificates(certificates, searchQuery, categoryFilter);
  const sorted = sortByDateDescending(filtered);

  return (
    <>
      <div className="mb-12 space-y-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          activeCategory={categoryFilter}
          onSelect={setCategoryFilter}
        />
      </div>

      <CertificateGrid certificates={sorted} />
    </>
  );
}
