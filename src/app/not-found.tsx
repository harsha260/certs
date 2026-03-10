import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">404</h2>
      <p className="text-neutral-400 mb-8 max-w-md">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}
