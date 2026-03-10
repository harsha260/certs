import Image from "next/image";
import type { Certificate } from "@/types/certificate";

interface CertificateCardProps {
  cert: Certificate;
}

export default function CertificateCard({ cert }: CertificateCardProps) {
  return (
    <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-neutral-800/50">
      {/* Certificate Image */}
      <Image
        src={cert.imageUrl}
        alt={cert.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-center items-center text-center p-6">
        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {cert.category}
        </span>

        <h3 className="text-2xl font-bold text-white leading-tight mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 drop-shadow-lg">
          {cert.title}
        </h3>

        <p className="text-neutral-300 text-sm mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
          {cert.issuer} &bull; {new Date(cert.date).getFullYear()}
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
  );
}
