import type { Certificate } from "@/types/certificate";

export const ALL_CATEGORIES = "All";

export function filterCertificates(
  certificates: Certificate[],
  searchQuery: string,
  category: string
): Certificate[] {
  const query = searchQuery.trim().toLowerCase();

  return certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query);
    const matchesCategory =
      category === ALL_CATEGORIES || cert.category === category;
    return matchesSearch && matchesCategory;
  });
}

function getDateValue(dateStr: string): number {
  const t = new Date(dateStr).getTime();
  return Number.isNaN(t) ? 0 : t;
}

export function sortByDateDescending(certificates: Certificate[]): Certificate[] {
  return [...certificates].sort(
    (a, b) => getDateValue(b.date) - getDateValue(a.date)
  );
}
