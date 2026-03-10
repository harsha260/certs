"use client";

import { useRef, useEffect, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (document.activeElement?.tagName ?? "")
        ) &&
        !document.activeElement?.hasAttribute("contenteditable")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        aria-label="Search certificates"
        placeholder="Search titles or issuers..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-4 pr-12 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all shadow-inner"
      />
      {!isFocused && (
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-800 border border-neutral-700 rounded px-1.5 py-0.5 text-xs text-neutral-400 font-mono pointer-events-none">
          /
        </kbd>
      )}
    </div>
  );
}
