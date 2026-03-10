import type { Certificate } from "@/types/certificate";

export function filterCertificates(
  certificates: Certificate[],
  searchQuery: string,
  category: string
): Certificate[] {
  const query = searchQuery.toLowerCase();

  return certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query);
    const matchesCategory = category === "All" || cert.category === category;
    return matchesSearch && matchesCategory;
  });
}

export function sortByDateDescending(certificates: Certificate[]): Certificate[] {
  return [...certificates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
