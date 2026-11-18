import Link from "next/link";
export default function NotFound() {
  return <main className="not-found-page"><span className="eyebrow">404 / PRODUCT NOT FOUND</span><h1>Nothing in this <em>part of the yard.</em></h1><p>That product might have moved, or the link may not be right.</p><Link className="primary-cta" href="/">← Back to the collection</Link></main>;
}
