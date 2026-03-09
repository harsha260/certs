"use client";

import { useState } from "react";
import certData from "../data/certificates.json";

export default function CertificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(certData.map((c) => c.category)))];

  const filteredCerts = certData.filter((cert) => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || cert.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedAndFilteredCerts = filteredCerts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-3">
            My Certifications
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            A visual catalog for my certs, that i wanted for a long time.
          </p>
        </header>

        {/* Search & Filter Section */}
        <div className="mb-12 space-y-6">
          <input
            type="text"
            placeholder="Search titles or issuers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-4 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all shadow-inner"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  categoryFilter === cat
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Catalog Grid - Adjusted for larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedAndFilteredCerts.length === 0 ? (
            <p className="text-neutral-500 italic col-span-full">No certificates found matching your criteria.</p>
          ) : (
            sortedAndFilteredCerts.map((cert) => (
              <div 
                key={cert.id} 
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-neutral-800/50"
              >
                {/* Certificate Image - Fully visible by default */}
                <img 
                  src={cert.imageUrl} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hidden Glass Overlay - Appears only on hover */}
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-center items-center text-center p-6">
                  
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {cert.category}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white leading-tight mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 drop-shadow-lg">
                    {cert.title}
                  </h3>
                  
                  <p className="text-neutral-300 text-sm mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                    {cert.issuer} • {new Date(cert.date).getFullYear()}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4 w-full max-w-xs translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    <a 
                      href={cert.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 bg-white text-black text-center py-2.5 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors"
                    >
                      View
                    </a>
                    <a 
                      href={cert.fileUrl} 
                      download 
                      className="flex-1 bg-neutral-800/80 text-white text-center py-2.5 rounded-lg text-sm font-bold border border-neutral-600 hover:bg-neutral-700 transition-colors"
                    >
                      Download
                    </a>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
