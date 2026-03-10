import type { Certificate } from "@/types/certificate";
import CertificateCard from "./CertificateCard";

interface CertificateGridProps {
  certificates: Certificate[];
}

export default function CertificateGrid({ certificates }: CertificateGridProps) {
  if (certificates.length === 0) {
    return (
      <p className="text-neutral-500 italic">
        No certificates found matching your criteria.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {certificates.map((cert) => (
        <CertificateCard key={cert.id} cert={cert} />
      ))}
    </div>
  );
}
