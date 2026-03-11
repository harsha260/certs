interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          aria-pressed={activeCategory === cat}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 outline-none ${
            activeCategory === cat
              ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
