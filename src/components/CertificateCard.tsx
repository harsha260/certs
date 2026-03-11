"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Certificate } from "@/types/certificate";

interface CertificateCardProps {
  cert: Certificate;
}

function getYear(dateStr: string): string {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? "" : String(d.getFullYear());
}

export default function CertificateCard({ cert }: CertificateCardProps) {
  const year = getYear(cert.date);
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent | TouchEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isActive, handleClickOutside]);

  const handleCardClick = () => {
    setIsActive((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsActive((prev) => !prev);
    }
    if (e.key === "Escape" && isActive) {
      setIsActive(false);
    }
  };

  const active = isActive ? "opacity-100" : "";
  const activeTranslate = isActive ? "translate-y-0" : "";
  const activeScale = isActive ? "scale-105" : "";
  const activePointer = isActive ? "pointer-events-auto" : "pointer-events-none";

  return (
    <div
      ref={cardRef}
      className="group rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-neutral-800/50"
    >
      {/* Image area with overlay */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        aria-label={`Show details for ${cert.title}`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        className="relative aspect-[4/3] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
      >
        <Image
          src={cert.imageUrl}
          alt={`Certificate: ${cert.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out card-image ${activeScale}`}
        />

        {/* Hover / Tap Overlay */}
        <div
          aria-hidden={!isActive}
          className={`absolute inset-0 bg-black/75 opacity-0 transition-opacity duration-300 ease-in-out flex flex-col justify-center items-center text-center p-6 card-overlay ${active} ${activePointer}`}
        >
          <span className={`text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 translate-y-4 transition-transform duration-500 delay-75 card-slide ${activeTranslate}`}>
            {cert.category}
          </span>

          <p className={`text-2xl font-bold text-white leading-tight mb-2 translate-y-4 transition-transform duration-500 delay-100 drop-shadow-lg card-slide ${activeTranslate}`}>
            {cert.title}
          </p>

          <p className={`text-neutral-300 text-sm mb-8 translate-y-4 transition-transform duration-500 delay-150 card-slide ${activeTranslate}`}>
            {cert.issuer} &bull; {year}
          </p>

          {/* Action Buttons */}
          <div className={`flex gap-4 w-full max-w-xs translate-y-4 transition-transform duration-500 delay-200 card-slide ${activeTranslate}`}>
            <a
              href={cert.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-white text-black text-center py-3 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors"
            >
              View
            </a>
            <a
              href={cert.fileUrl}
              download
              tabIndex={isActive ? 0 : -1}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-neutral-800/80 text-white text-center py-3 rounded-lg text-sm font-bold border border-neutral-600 hover:bg-neutral-700 transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      </div>

      {/* Always-visible card info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight truncate">
          {cert.title}
        </h3>
        <p className="text-neutral-400 text-xs mt-1 truncate">
          {cert.issuer} &bull; {year}
        </p>
      </div>
    </div>
  );
}
