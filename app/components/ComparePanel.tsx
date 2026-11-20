"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "../data/products";

const categories = ["All", "Sneakers", "Audio", "Wearables", "Gadgets"] as const;
type Category = (typeof categories)[number];

export default function ComparePanel({ currentProductId }: { currentProductId: string }) {
  const [category, setCategory] = useState<Category>("All");
  const choices = products.filter((product) =>
    product.id !== currentProductId && (category === "All" || product.category === category)
  );
  const highest = Math.max(1, ...products.map((product) => product.price));

  return (
    <>
      <div className="comparison-filters" role="group" aria-label="Filter product comparison">
        {categories.map((item) => (
          <button key={item} type="button" className="comparison-filter"
            aria-pressed={item === category} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="comparison-grid">
        {choices.map((item) => (
          <Link href={`/products/${item.id}`} key={item.id} className="comparison-item">
            <Image src={item.image} alt={`${item.name} product illustration`}
              width={400} height={300} sizes="(max-width: 740px) 50vw, 200px" loading="lazy" />
            <strong>{item.name}</strong>
            <span>{item.category}</span>
            <p className="compare-price">${item.price.toFixed(2)}</p>
            <div className="compare-bar" aria-hidden="true">
              <div className="compare-bar-fill" style={{ width: `${(item.price / highest) * 100}%` }} />
            </div>
          </Link>
        ))}
      </div>
      {choices.length === 0 && <p>No other products in this category.</p>}
    </>
  );
}
