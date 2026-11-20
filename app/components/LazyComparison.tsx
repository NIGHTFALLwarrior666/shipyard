"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ComparePanel = dynamic(() => import("./ComparePanel"), {
  loading: () => <p className="comparison-loading" role="status">Loading product comparison…</p>,
});

export default function LazyComparison({ currentProductId }: { currentProductId: string }) {
  const [visible, setVisible] = useState(false);
  const anchor = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = anchor.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="comparison-section" ref={anchor} aria-labelledby="comparison-title">
      <span className="eyebrow comparison-eyebrow">EXPLORE MORE / ON DEMAND</span>
      <h2 id="comparison-title">Find your next essential.</h2>
      <p>Compare prices and discover other pieces in the collection.</p>
      {visible ? <ComparePanel currentProductId={currentProductId} /> :
        <p className="comparison-loading">The interactive comparison loads as you scroll here.</p>}
    </section>
  );
}
