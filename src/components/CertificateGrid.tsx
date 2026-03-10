import type { Certificate } from "@/types/certificate";
import CertificateCard from "./CertificateCard";

interface CertificateGridProps {
  certificates: Certificate[];
}

export default function CertificateGrid({ certificates }: CertificateGridProps) {
  if (certificates.length === 0) {
    return (
      <section aria-label="Certificate results" aria-live="polite">
        <p className="text-neutral-500 italic">
          No certificates found matching your criteria.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Certificate results" aria-live="polite">
      <p className="sr-only">
        {certificates.length} certificate{certificates.length !== 1 ? "s" : ""} found
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </section>
  );
}
