import certData from "@/data/certificates.json";
import type { Certificate } from "@/types/certificate";
import Header from "@/components/Header";
import CertificateExplorer from "@/components/CertificateExplorer";

const certificates: Certificate[] = certData;

const categories = [
  "All",
  ...Array.from(new Set(certificates.map((c) => c.category))),
];

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        <Header />
        <CertificateExplorer
          certificates={certificates}
          categories={categories}
        />
      </div>
    </main>
  );
}
