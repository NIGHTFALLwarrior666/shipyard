export default function Loading() {
  return (
    <main className="status-page" aria-live="polite" aria-busy="true">
      <span className="eyebrow">LOADING</span>
      <h1 className="status-title">Loading ShipYard…</h1>
      <p>Fetching the goods. Just a moment.</p>
    </main>
  );
}
