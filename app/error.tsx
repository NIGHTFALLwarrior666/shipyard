"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="status-page">
      <span className="eyebrow">ERROR</span>
      <h1 className="status-title">Something went wrong.</h1>
      <p>
        {error.message
          ? error.message
          : "An unexpected error occurred loading this page."}
      </p>
      <button className="primary-cta" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
