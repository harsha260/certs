"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">
        Something went wrong
      </h2>
      <p className="text-neutral-400 mb-8 max-w-md">
        An unexpected error occurred while loading the page. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
